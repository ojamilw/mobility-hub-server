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

var definedServiceModel = mongoose.model('definedService', {
    user: {type:String},
    service: {type:String},
    category: {type:String},
    brand: {type:String},
    sku: {type:String},
    price: {type:Number},
    duration: {type:Number},
    dateFrom: {type:Date},
    dateTo: {type:Date},
});

module.exports = { 
    userModel, 
    serviceModel, 
    categoryModel,
    brandModel,
    skuModel,
    definedServiceModel
} 