const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId
var { rating_reviewModel } = require('../models/dbModels')
const fs = require('fs')

router.get('/', (req, res)=>{
    rating_reviewModel.find((err, docs)=> {
        if(!err) res.send(docs)
        else res.send("error while retrieving user all records "+ JSON.stringify(err, undefined, 2))
    })
})
 

router.get('/:id', (req, res)=>{
    rating_reviewModel.aggregate([
        { $addFields: { "userObjectId": { "$toObjectId": "$consumer" }}},
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