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
    user: {type:String, required: true},
    service: {type:String, required: true},
    category: {type:String, required: true},
    brand: {type:String, required: true},
    sku: {type:String, required: true},
    price: {type:Number, required: true},
    duration: {type:Number, required: true},
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