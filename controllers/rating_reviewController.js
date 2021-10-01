const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId
var { rating_reviewModel, userModel, universalServiceModel } = require('../models/dbModels')
const fs = require('fs')
const moment = require('moment')

router.get('/', (req, res)=>{
    rating_reviewModel.aggregate([
        { 
            $addFields: {
                "userObjectId": { 
                    "$toObjectId": "$consumer" 
                }
            }
        },
        {
            $lookup: {
               from: "users", 
               localField: "userObjectId",
               foreignField: "_id",
               as: "consumerdetail"
            }
        },
        {
            $lookup: {
               from: "universalservices", 
               localField: "string",
               foreignField: "string",
               as: "service"
            }
        },
    ],(err, docs)=> {
        if(!err) res.send(docs)
        else res.send("error while retrieving user all records "+ JSON.stringify(err, undefined, 2))
    })
})
 
router.get('/detail', (req, res)=>{
    rating_reviewModel.aggregate([
        { 
            $addFields: {
                "consumerObjectId": {
                    "$toObjectId": "$consumer" 
                },
                "serviceProviderObjectId": { 
                    "$toObjectId": "$serviceProvider" 
                },
                "serviceObjectId":{
                    "$toObjectId": "$service"
                }
            }
        },
        {
            $lookup: {
               from: "users", 
               localField: "consumerObjectId",
               foreignField: "_id",
               as: "consumerDetail"
            }
        },
        { 
            $lookup: {
               from: "users", 
               localField: "serviceProviderObjectId",
               foreignField: "_id",
               as: "serviceProviderDetail"
            }
        },
        {
            $lookup: {
               from: "universalservices",
               localField: "serviceObjectId",
               foreignField: "_id",
               as: "service"
            }
        },
        {
            $unwind: {
              path: "$service",
              preserveNullAndEmptyArrays: true
            }
        },
        {
            $addFields: {
                "theCategory": { 
                    "$toObjectId": "$service.category" 
                },
                "theService": { 
                    "$toObjectId": "$service.service" 
                }
            }
        },
        {
            $lookup: {
               from: "categories",
               localField: "theCategory",
               foreignField: "_id",
               as: "service.categories"
            }
        },
        {
            $lookup: {
               from: "services",
               localField: "theService",
               foreignField: "_id",
               as: "service.services"
            }
        },
        { $sort : { datetime : -1 } }
    ],(err, docs)=> {
        if(!err) res.send(docs)
        else res.send("error while retrieving user all records "+ JSON.stringify(err, undefined, 2))
    })
})

router.get('/detail/:id', (req, res)=>{
    rating_reviewModel.aggregate([
        { 
            $addFields: {
                "consumerObjectId": {
                    "$toObjectId": "$consumer" 
                },
                "serviceProviderObjectId": { 
                    "$toObjectId": "$serviceProvider" 
                },
                "serviceObjectId":{
                    "$toObjectId": "$service"
                }
            }
        },
        {
            $lookup: {
               from: "users", 
               localField: "consumerObjectId",
               foreignField: "_id",
               as: "consumerDetail"
            }
        },
        { 
            $lookup: {
               from: "users", 
               localField: "serviceProviderObjectId",
               foreignField: "_id",
               as: "serviceProviderDetail"
            }
        },
        {
            $lookup: {
               from: "universalservices",
               localField: "serviceObjectId",
               foreignField: "_id",
               as: "service"
            }
        },
        {
            $unwind: {
              path: "$service",
              preserveNullAndEmptyArrays: true
            }
        },
        {
            $addFields: {
                "theCategory": { 
                    "$toObjectId": "$service.category" 
                },
                "theService": { 
                    "$toObjectId": "$service.service" 
                }
            }
        },
        {
            $lookup: {
               from: "categories",
               localField: "theCategory",
               foreignField: "_id",
               as: "service.categories"
            }
        },
        {
            $lookup: {
               from: "services",
               localField: "theService",
               foreignField: "_id",
               as: "service.services"
            }
        },
        { $match : { serviceProvider: req.params.id}},
        { $sort : { datetime : -1 } }
    ],(err, docs)=> {
        if(!err) res.send(docs)
        else res.send("error while retrieving user all records "+ JSON.stringify(err, undefined, 2))
    })
})
/**
 * 
        
 */
router.get('/:id', (req, res)=>{
    rating_reviewModel.aggregate([
        { 
            $addFields: {
                "userObjectId": { 
                    "$toObjectId": "$consumer" 
                },
                "serviceObjectId":{
                    "$toObjectId": "$service"
                }
            }
        },
        {
            $lookup: {
               from: "users", 
               localField: "userObjectId",
               foreignField: "_id",
               as: "consumerdetail"
            }
        },
        {
            $lookup: {
               from: "universalservices", 
               localField: "serviceObjectId",
               foreignField: "_id",
               as: "service"
            }
        },
        {
            $unwind: {
              path: "$service",
              preserveNullAndEmptyArrays: true
            }
        },
        {
            $addFields: {
                "theCategory": { 
                    "$toObjectId": "$service.category" 
                },
                "theService": { 
                    "$toObjectId": "$service.service" 
                }
            }
        },
        {
            $lookup: {
               from: "categories",
               localField: "theCategory",
               foreignField: "_id",
               as: "service.categories"
            }
        }, 
        {
            $lookup: {
               from: "services",
               localField: "theService",
               foreignField: "_id",
               as: "service.services"
            }
        },
        { $match : { serviceProvider : req.params.id } },
        { $sort : { datetime : -1 } },
    ],(err, docs)=> {
        if(!err) res.send(docs)
        else res.send("error while retrieving user all records "+ JSON.stringify(err, undefined, 2))
    })
})

router.get('/consumer/:id', (req, res)=>{
    rating_reviewModel.aggregate([
        { 
            $addFields: {
                "userObjectId": { 
                    "$toObjectId": "$serviceProvider" 
                }
            }
        },
        {
            $lookup: {
               from: "users", 
               localField: "userObjectId",
               foreignField: "_id",
               as: "listingDetail"
            }
        },
        {
            $lookup: {
               from: "universalservices",
               localField: "string",
               foreignField: "string",
               as: "service"
            }
        },
        { $match : { consumer : req.params.id } },
    ],(err, docs)=> {
        if(!err) res.send(docs)
        else res.send("error while retrieving user all records "+ JSON.stringify(err, undefined, 2))
    })
})

router.get('/:directory/:service', (req, res)=>{
    rating_reviewModel.find({serviceProvider: req.params.directory, service:req.params.service}, {rating:1}, (err, doc)=> {
        if(err) res.send(err)
        else res.send(doc)
    })
})

router.post('/', async (req, res)=>{
    var allImages = req.body.images
    const currentTime = moment().format().toString().replace(/-/g, '').replace(/:/g, '').replace('+', '')
    var theImages = []
    if(allImages.length > 0){
        await allImages.map(async (element, index)=>{
            var theName = `img${currentTime}-${index}`
            theImages.push({image:theName})
            await fs.writeFile(`./uploads/${theName}.png`, element, 'base64', (err) => {
                if (err) console.log(err)
            })
        })
    }
    var updateRecord = {
        keywords: req.body.keywords
    }

    userModel.findByIdAndUpdate(req.body.serviceProvider, {$set: updateRecord}, (err, docs)=>{
        if(err) res.send("error while updating user records "+ JSON.stringify(err, undefined, 2))
    })
    
    var newRecord = new rating_reviewModel({
        consumer: req.body.consumer,
        service: req.body.service,
        serviceProvider: req.body.serviceProvider,
        rating: req.body.rating, 
        review: req.body.review,
        datetime: Date.now(),
        images: theImages,
    })

    newRecord.save((err, docs)=>{
        if(!err) res.send(docs)
        else res.send("error while saving user records "+ JSON.stringify(err, undefined, 2))
    })

    // const updateRecord = {
    //     keywords:[]
    // }
    // userModel.findByIdAndUpdate(req.params.id, {$set: updateRecord}, (err, docs)=>{
    //     if(!err) res.send(docs)
    //     else res.send("error while updating user records "+ JSON.stringify(err, undefined, 2))
    // })
})

router.post('/checking', async (req, res)=>{
    //res.send(req.body.serviceProvider)
    userModel.findOne({_id: new ObjectID(req.body.serviceProvider)}, 
    function(err, doc){
        if(err) res.send(error)
        else res.send(doc)
    })

    // const updateRecord = {
    //     keywords:[]
    // }
    // userModel.findByIdAndUpdate(req.params.id, {$set: updateRecord}, (err, docs)=>{
    //     if(!err) res.send(docs)
    //     else res.send("error while updating user records "+ JSON.stringify(err, undefined, 2))
    // })
})

router.delete('/:id', (req, res)=>{
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("No record with given id: "+req.params.id)

    rating_reviewModel.findByIdAndRemove(req.params.id, (err, docs)=>{
        if(!err) res.send(docs)
        else res.send("error while removing user records "+ JSON.stringify(err, undefined, 2))
    })
})



module.exports = router