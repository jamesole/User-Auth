//going to check for json web token in the headers 
//THIS CAN CHECK PROTECTED ROUTES

const jwt = require('jsonwebtoken');
const User = require('../model/user');
const ErrorResponse = require('../utils/errorResponse');
require('dotenv').config();

const protect = async(req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }

    //decode the token we just got from the req.header
    try {
        //verify decrypts the token, based off of the secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //id will be found in this token, as payload is the token
        const user = await User.findById(decoded.id);

        if (!user) {
            return next(new ErrorResponse('No user found with this id'), 404)
        }
        //if its good/valid
        req.user = user;

        res.json({id: decoded.id});

        //necessary to contineu on to the next middleware
        next();
    }
    catch (err) {
        return next(new ErrorResponse('Not authorized to access this route'), 401);
    }
}

module.exports = {protect};
