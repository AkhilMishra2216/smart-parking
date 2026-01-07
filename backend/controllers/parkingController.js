const supabase = require('../config/supabaseClient');
exports.scanQrCode = async (req, res, next) => {
    try {
        const { qr_code, vehicle_id } = req.body;
        const { data: vehicle, error: vehicleError } = await supabase
            .from('vehicles')
            .select('*')
            .eq('id', vehicle_id)
            .single();
        if (vehicleError || !vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }
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
            const activeSession = activeSessions[0];
            const exitTime = new Date();
            const entryTime = new Date(activeSession.entry_time);
            const hours = (exitTime - entryTime) / (1000 * 60 * 60);
            const amount = Math.ceil(hours * 50); 
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
            const { data: newSession, error: insertError } = await supabase
                .from('parking_sessions')
                .insert([{
                    vehicle_id: vehicle_id,
                    entry_time: new Date().toISOString(),
                    status: 'active',
                    qr_code: qr_code,
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
};
exports.getDashboard = async (req, res, next) => {
    try {
        const { vehicle_id } = req.params;
        const { data: vehicle, error: vehicleError } = await supabase
            .from('vehicles')
            .select('id')
            .eq('id', vehicle_id)
            .single();
        if (vehicleError || !vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }
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
};