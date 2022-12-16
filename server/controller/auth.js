const User = require('../model/user');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

const register = async(req, res, next) => {

    User.findOne({email: req.body.email}, async(err, doc) => {

        if (err) throw err;

        else if (doc) {
            return next(new ErrorResponse('Already an account with this email'), 401);
        }
        else if (!doc) {
            try {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                const user = await User.create({
                    email:req.body.email,
                    password:hashedPassword,
                });

                if (user) {
                    res.status(201).json({
                        id: user._id,
                        email: user.email,
                        token: generateToken(user._id),
                    })
                }
                else {
                    return next(new ErrorResponse("Something went wrong", 400))
                }
            }
            catch (err) {
                next(err);
            }
        }
    })
} 

const login = async(req, res, next) => {

    const {email, password} = req.body;

    try {

        const user = await User.findOne({email})

        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                id: user._id,
                email: user.email,
                token: generateToken(user._id),
            })
            console.log('Success!')
        }
        else {
            return next(new ErrorResponse("Passwords not the same", 401))
        }
    }
    catch(err) {
        next(err);
    }
}

const getUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.body.id);
        res.json({user:user});
        
    }
    catch(err) {
        next(err);
    }
}

//signs a new token with the id as the payload
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}
