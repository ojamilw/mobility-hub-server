const mongoose = require('mongoose')

var userModel = mongoose.model('user', {
    name: {type:String},
    email: {type:String},
    phone: {type:String},
    type: {type:Number},
    pass: {type:String},
})

module.exports = { userModel }