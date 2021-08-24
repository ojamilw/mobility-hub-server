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
    datetime: {type:Date, required: true},
    images: {type:Array},
})

var universalServiceModel = mongoose.model('universalService', {
    category: {type:String, required: true},
    service: {type:String, required: true},
    type: {type:Array},
    datetime: {type:Date}
})

var makeModel = mongoose.model('make', {
    name: {type: String, required:true}
})

var yearModel = mongoose.model('yearr', {
    name: {type: String, required:true}
})

var modelModel = mongoose.model('model', {
    name: {type: String, required:true},
    make: {type: String, required:true},
    year: {type: String, required:true}
})

var versionModel = mongoose.model('version', {
    name: {type: String, required:true},
    model: {type: String, required:true}
})

var mobilityPartnerModel = mongoose.model('mobilitypartner',{
    name: {type: String, required: true},
    make: {type: String, required: true},
    nameID: {type: String, required: true},
    year: {type: String, required: true},
    yearID: {type: String, required: true},
    model: {type: String, required: true},
    modelID: {type: String, required: true},
    version: {type: String, required: true},
    versionID: {type: String, required: true},
    consumer: {type: String, required: true}
})

module.exports = {
    userModel, 
    serviceModel, 
    categoryModel,
    brandModel,
    skuModel,
    definedServiceModel,
    rating_reviewModel,
    universalServiceModel,
    makeModel,
    yearModel,
    modelModel,
    versionModel,
    mobilityPartnerModel
} 