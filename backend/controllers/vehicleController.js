const supabase = require('../config/supabaseClient');
exports.registerVehicle = async (req, res, next) => {
    try {
        console.log('Registering vehicle:', req.body);
        const { owner_name, license_plate, contact } = req.body;
        const { data: existingVehicle, error: fetchError } = await supabase
            .from('vehicles')
            .select('*')
            .eq('license_plate', license_plate)
            .single();
        if (fetchError && fetchError.code !== 'PGRST116') { 
            console.error('Supabase fetch error:', fetchError);
            throw fetchError;
        }
        if (existingVehicle) {
            console.log('Vehicle already exists:', existingVehicle);
            return res.status(409).json({
                error: 'Vehicle with this license plate already exists',
                vehicle: existingVehicle
            });
        }
        const { data: newVehicle, error: insertError } = await supabase
            .from('vehicles')
            .insert([{
                owner_name: owner_name || null,
                license_plate: license_plate,
                contact: contact || null,
                created_at: new Date().toISOString()
            }])
            .select()
            .single();
        if (insertError) {
            console.error('Supabase insert error:', insertError);
            throw new Error('Failed to register vehicle: ' + insertError.message);
        }
        console.log('Vehicle registered successfully:', newVehicle);
        res.status(201).json({
            message: 'Vehicle registered successfully',
            vehicle: newVehicle
        });
    } catch (err) {
        console.error('Registration error:', err);
        next(err);
    }
};