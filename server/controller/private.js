
const ErrorResponse = require('../utils/errorResponse');

const getPrivateData = (req, res, next) => {
    try {
        res.status(200).json({
            success: 'true',
            msg: 'You are in!'
        })
    }
    catch (err) {
        return next(new ErrorResponse('You are not authorized to access this page'), 401);
    }
}

module.exports = getPrivateData;
