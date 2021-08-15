const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId

var { definedServiceModel } = require('../models/dbModels')

router.get('/:id', (req, res)=>{
    definedServiceModel.aggregate(
        [
            {
                $lookup: {
                   from: "services", 
                   localField: "string",
                   foreignField: "string",
                   as: "service"
                }
            },
            {
                $lookup: {
                   from: "categories", 
                   localField: "string",
                   foreignField: "string",
                   as: "category"
                }
            },
            {
                $lookup: {
                   from: "brands", 
                   localField: "string",
                   foreignField: "string",
                   as: "brand"
                } 
            },
            {
                $lookup: {
                   from: "skus", 
                   localField: "string",
                   foreignField: "string",
                   as: "sku"
                }
            },
            { $match : { user : req.params.id } }
        ], (err, docs)=> {
        if(!err) res.send(docs)
        else console.log("error while retrieving user all records "+ JSON.stringify(err, undefined, 2))
    })
})

router.post('/', (req, res)=>{

    var newRecord = new definedServiceModel({
        user: req.body.user,
        service: req.body.service,
        category: req.body.category,
        brand: req.body.brand,
        sku: req.body.sku,
        price: req.body.price,
        duration: req.body.duration,
        timeFrom: req.body.timeFrom,
        timeTo: req.body.timeTo
    })

    newRecord.save((err, docs)=>{
        if(!err) res.send(docs)
        else res.send("error while saving records "+ JSON.stringify(err, undefined, 2))
    })
})


router.put('/:id', (req, res)=>{
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("No record with given id: "+req.params.id)

    var updateRecord = {
        user: req.body.user,
        service: req.body.service,
        category: req.body.category,
        brand: req.body.brand,
        sku: req.body.sku,
        price: req.body.price,
        duration: req.body.duration,
        timeFrom: req.body.timeFrom,
        timeTo: req.body.timeTo
    }

    definedServiceModel.findByIdAndUpdate(req.params.id, {$set: updateRecord}, (err, docs)=>{
        if(!err) res.send(docs)
        else console.log("error while updating user records "+ JSON.stringify(err, undefined, 2))
    })
})

router.delete('/:id', (req, res)=>{
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("No record with given id: "+req.params.id)

    definedServiceModel.findByIdAndRemove(req.params.id, (err, docs)=>{
        if(!err) res.send(docs)
        else console.log("error while removing user records "+ JSON.stringify(err, undefined, 2))
    })
})

module.exports = router