const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { body, param, validationResult } = require('express-validator');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Validate required environment variables
const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars.join(', '));
  process.exit(1);
}

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Security middleware
app.use(helmet());
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || (NODE_ENV === 'production' 
    ? false 
    : ['http://localhost:5173', 'http://localhost:3000']),
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: NODE_ENV === 'production' ? 100 : 1000, // Limit each IP to 100 requests per windowMs in production
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      error: 'Validation error', 
      details: err.message 
    });
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ 
      error: 'Unauthorized', 
      message: err.message 
    });
  }
  
  res.status(err.status || 500).json({
    error: NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
    ...(NODE_ENV !== 'production' && { stack: err.stack })
  });
};

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: errors.array() 
    });
  }
  next();
};

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Smart Parking API',
    status: 'running',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      register: 'POST /api/register',
      scan: 'POST /api/scan',
      dashboard: 'GET /api/dashboard/:vehicle_id'
    },
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: NODE_ENV 
  });
});

// API Routes

// Register vehicle
app.post('/api/register', 
  [
    body('license_plate').trim().notEmpty().withMessage('License plate is required'),
    body('owner_name').optional().trim().isLength({ max: 100 }).withMessage('Owner name too long'),
    body('contact').optional().trim().isLength({ max: 20 }).withMessage('Contact too long'),
  ],
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const { owner_name, license_plate, contact } = req.body;

      // Check if vehicle already exists
      const { data: existingVehicle } = await supabase
        .from('vehicles')
        .select('*')
        .eq('license_plate', license_plate)
        .single();

      if (existingVehicle) {
        return res.status(409).json({ 
          error: 'Vehicle with this license plate already exists',
          vehicle: existingVehicle
        });
      }

      // Insert new vehicle
      const { data: newVehicle, error } = await supabase
        .from('vehicles')
        .insert([{
          owner_name: owner_name || null,
          license_plate: license_plate,
          contact: contact || null,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error('Failed to register vehicle');
      }

      res.status(201).json({ 
        message: 'Vehicle registered successfully', 
        vehicle: newVehicle 
      });
    } catch (err) {
      next(err);
    }
  }
);

// Scan QR code (entry/exit)
app.post('/api/scan',
  [
    body('qr_code').trim().notEmpty().withMessage('QR code is required'),
    body('vehicle_id').isInt({ min: 1 }).withMessage('Valid vehicle ID is required'),
  ],
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const { qr_code, vehicle_id } = req.body;

      // Check if vehicle exists
      const { data: vehicle, error: vehicleError } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', vehicle_id)
        .single();

      if (vehicleError || !vehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }

      // Find active session for this vehicle
      const { data: activeSessions, error: sessionError } = await supabase
        .from('parking_sessions')
        .select('*')
        .eq('vehicle_id', vehicle_id)
        .eq('status', 'active')
        .order('entry_time', { ascending: false })
        .limit(1);

      if (sessionError) {
        console.error('Supabase error:', sessionError);
        throw new Error('Failed to check parking sessions');
      }

      if (activeSessions && activeSessions.length > 0) {
        // Exit: Complete the active session
        const activeSession = activeSessions[0];
        const exitTime = new Date();
        const entryTime = new Date(activeSession.entry_time);
        const hours = (exitTime - entryTime) / (1000 * 60 * 60);
        const amount = Math.ceil(hours * 50); // ₹50 per hour

        const { data: updatedSession, error: updateError } = await supabase
          .from('parking_sessions')
          .update({
            exit_time: exitTime.toISOString(),
            status: 'completed',
            amount: amount,
            updated_at: exitTime.toISOString()
          })
          .eq('id', activeSession.id)
          .select()
          .single();

        if (updateError) {
          console.error('Supabase error:', updateError);
          throw new Error('Failed to complete parking session');
        }

        return res.json({ 
          type: 'exit', 
          session: updatedSession 
        });
      } else {
        // Entry: Create new session
        const { data: newSession, error: insertError } = await supabase
          .from('parking_sessions')
          .insert([{
            vehicle_id: vehicle_id,
            entry_time: new Date().toISOString(),
            status: 'active',
            spot_id: qr_code,
            created_at: new Date().toISOString()
          }])
          .select()
          .single();

        if (insertError) {
          console.error('Supabase error:', insertError);
          throw new Error('Failed to create parking session');
        }

        return res.json({ 
          type: 'entry', 
          session: newSession 
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

// Get dashboard data (parking history)
app.get('/api/dashboard/:vehicle_id',
  [
    param('vehicle_id').isInt({ min: 1 }).withMessage('Valid vehicle ID is required'),
  ],
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const { vehicle_id } = req.params;

      // Check if vehicle exists
      const { data: vehicle, error: vehicleError } = await supabase
        .from('vehicles')
        .select('id')
        .eq('id', vehicle_id)
        .single();

      if (vehicleError || !vehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }

      // Get parking history
      const { data: history, error: historyError } = await supabase
        .from('parking_sessions')
        .select('*')
        .eq('vehicle_id', vehicle_id)
        .order('entry_time', { ascending: false });

      if (historyError) {
        console.error('Supabase error:', historyError);
        throw new Error('Failed to fetch parking history');
      }

      res.json({ history: history || [] });
    } catch (err) {
      next(err);
    }
  }
);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📊 Environment: ${NODE_ENV}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});
