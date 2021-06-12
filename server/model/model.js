const mongoose = require('mongoose');
// const strict = require('assert');

let user = new mongoose.Schema({

    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    gender: {
        type:String,
    },
    status: {
        type: String,
    }    
})

module.exports = User = mongoose.model('logindata',user);
