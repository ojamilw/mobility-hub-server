const mongoose = require('mongoose')

var userModel = mongoose.model('user', {
    name: {type:String},
    email: {type:String},
    phone: {type:String},
    type: {type:Number},
    pass: {type:String},
});

var serviceModel = mongoose.model('service', {
    name: {type:String},
});

var categoryModel = mongoose.model('category', {
    service: {type:String},
    name: {type:String},
});

var brandModel = mongoose.model('brand', {
    name: {type:String},
});

var skuModel = mongoose.model('sku', {
    name: {type:String},
});

module.exports = { 
    userModel, 
    serviceModel, 
    categoryModel,
    brandModel,
    skuModel
} 