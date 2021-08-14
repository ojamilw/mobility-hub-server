const mongoose = require('mongoose')

var userModel = mongoose.model('user', {
    business_status : {type:String},
    formatted_address : {type:String},
    geometry : {type:Array},
    icon : {type:String},
    name : {type:String},
    photos : {type:Array},
    reference : {type:String},
    types : {type:Array},
    parther_site : {type:Boolean},
    active_status : {type:Boolean},
    description : {type:String},
    email : {type:String},
    phone : {type:String},
    social : {type:Array},
    password : {type:String},
    type: {type:Number},
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

var rating_reviewModel = mongoose.model('rating_review', {
    consumer: {type:String, required: true},
    service: {type:String, required: true},
    serviceProvider: {type:String, required: true},
    rating: {type:String, required: true},
    review: {type:String, required: true},
})

var universalServiceModel = mongoose.model('universalService', {
    category: {type:String, required: true},
    service: {type:String, required: true},
    type: {type:Array},
    datetime: {type:Date}
})

module.exports = { 
    userModel, 
    serviceModel, 
    categoryModel,
    brandModel,
    skuModel,
    definedServiceModel,
    rating_reviewModel,
    universalServiceModel
} 