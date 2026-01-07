const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const vehicleRoutes = require('./routes/vehicleRoutes');
const parkingRoutes = require('./routes/parkingRoutes');
const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars.join(', '));
  process.exit(1);
}
app.use(helmet());
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));
const corsOptions = {
  origin: process.env.FRONTEND_URL || (NODE_ENV === 'production'
    ? false
    : ['http://localhost:5173', 'http://localhost:3000']),
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: NODE_ENV === 'production' ? 100 : 1000,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);
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
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV
  });
});
app.use('/api', vehicleRoutes);
app.use('/api', parkingRoutes);
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
app.use(errorHandler);
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📊 Environment: ${NODE_ENV}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});