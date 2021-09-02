const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId
var { rating_reviewModel } = require('../models/dbModels')
const fs = require('fs')

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
               localField: "string",
               foreignField: "string",
               as: "service"
            }
        },
        { $sort : { datetime : -1 } }
    ],(err, docs)=> {
        if(!err) res.send(docs)
        else res.send("error while retrieving user all records "+ JSON.stringify(err, undefined, 2))
    })
})

router.get('/:id', (req, res)=>{
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
        { $match : { serviceProvider : req.params.id } },
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

router.post('/', (req, res)=>{
    var newRecord = new rating_reviewModel({
        consumer: req.body.consumer,
        service: req.body.service,
        serviceProvider: req.body.serviceProvider,
        rating: req.body.rating, 
        review: req.body.review,
        datetime: Date.now(),
        images: req.body.images,
    })

    newRecord.save((err, docs)=>{
        if(!err) res.send(docs)
        else res.send("error while saving user records "+ JSON.stringify(err, undefined, 2))
    })
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