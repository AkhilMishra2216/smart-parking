const { body, param, validationResult } = require('express-validator');
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
exports.validateRegister = [
    body('license_plate').trim().notEmpty().withMessage('License plate is required'),
    body('owner_name').optional().trim().isLength({ max: 100 }).withMessage('Owner name too long'),
    body('contact').optional().trim().isLength({ max: 20 }).withMessage('Contact too long'),
    handleValidationErrors
];
exports.validateScan = [
    body('qr_code').trim().notEmpty().withMessage('QR code is required'),
    body('vehicle_id').isInt({ min: 1 }).withMessage('Valid vehicle ID is required'),
    handleValidationErrors
];
exports.validateDashboard = [
    param('vehicle_id').isInt({ min: 1 }).withMessage('Valid vehicle ID is required'),
    handleValidationErrors
];