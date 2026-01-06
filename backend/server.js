const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Supabase Setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey); 
// Uncomment above when env vars are set

// -- Mock Data for Prototype --
let vehicles = [];
let parkingSessions = [];

// Routes

// 1. Register Vehicle
app.post('/api/register', async (req, res) => {
    const { owner_name, license_plate, contact } = req.body;
    if (!license_plate) return res.status(400).json({ error: 'License plate required' });

    const newVehicle = { id: Date.now(), owner_name, license_plate, contact };
    vehicles.push(newVehicle);

    // TODO: Supabase Insert
    // const { data, error } = await supabase.from('vehicles').insert([{ ... }]);

    res.status(201).json({ message: 'Vehicle registered', vehicle: newVehicle });
});

// 2. Scan QR (Check-in / Check-out)
app.post('/api/scan', async (req, res) => {
    const { qr_code, vehicle_id } = req.body;

    // Logic: detailed check if vehicle is currently parked
    const activeSession = parkingSessions.find(s => s.vehicle_id === vehicle_id && s.status === 'active');

    if (activeSession) {
        // End active session (Check out)
        activeSession.exit_time = new Date();
        activeSession.status = 'completed';
        // Calculate mock fee
        const hours = (activeSession.exit_time - activeSession.entry_time) / (1000 * 60 * 60);
        activeSession.amount = Math.ceil(hours * 50); // 50rs per hour

        return res.json({ type: 'exit', session: activeSession });
    } else {
        // Create new session (Check in)
        const newSession = {
            id: Date.now(),
            vehicle_id,
            entry_time: new Date(),
            status: 'active',
            spot_id: qr_code // assuming QR code is spot ID
        };
        parkingSessions.push(newSession);
        return res.json({ type: 'entry', session: newSession });
    }
});

// 3. Get Dashboard Data
app.get('/api/dashboard/:vehicle_id', (req, res) => {
    const { vehicle_id } = req.params;
    const history = parkingSessions.filter(s => s.vehicle_id == vehicle_id);
    res.json({ history });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
