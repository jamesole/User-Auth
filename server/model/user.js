const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        trim:true,
        required:true,
        unique:true,
    },
    password: {
        type:String,
        trim:true,
        required: true,
        minlength: 6,
    },
    favMovie: {
        type:String,
        trim:true,
        required:true
    }
});



module.exports = new mongoose.model('User', userSchema);
