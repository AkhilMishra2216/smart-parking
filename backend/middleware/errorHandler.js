const NODE_ENV = process.env.NODE_ENV || 'development';
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
module.exports = errorHandler;