const mongoose = require('mongoose')

var serviceModel = mongoose.model('service', {
    name: {type:String},
})

module.exports = { serviceModel } 