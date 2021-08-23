const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId

var { modelModel } = require('../models/dbModels')

router.get('/', (req, res)=>{
    modelModel.find((err, docs)=> {
        if(!err) res.send(docs)
        else console.log("error while retrieving  all records "+ JSON.stringify(err, undefined, 2))
    })
})

router.get('/:make/:year', (req, res)=>{
    modelModel.aggregate([
        { 
            $addFields: {
                "makeObject": { "$toObjectId": "$make" },
                "yearObject": { "$toObjectId": "$year"}
            }
        },
        {
            $lookup: {
               from: "makes",
               localField: "makeObject",
               foreignField: "_id",
               as: "themake"
            }
        },
        {
            $lookup: {
               from: "yearrs", 
               localField: "yearObject",
               foreignField: "_id",
               as: "theyear"
            }
        },
        {$match : {make: req.params.make, year: req.params.year}}
    ],(err, docs)=> {
        if(!err) res.send(docs)
        else res.send("error while retrieving all records "+ JSON.stringify(err, undefined, 2))
    })
})

router.post('/', (req, res)=>{
    var newRecord = new modelModel({
        name: req.body.name,
        make: req.body.make,
        year: req.body.year
    })

    newRecord.save((err, docs)=>{
        if(!err) res.send(docs)
        else console.log("error while saving  records "+ JSON.stringify(err, undefined, 2))
    })
})

router.put('/:id', (req, res)=>{
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("No record with given id: "+req.params.id)

    var updateRecord = {
        name: req.body.name,
    }

    modelModel.findByIdAndUpdate(req.params.id, {$set: updateRecord}, (err, docs)=>{
        if(!err) res.send(docs)
        else console.log("error while updating  records "+ JSON.stringify(err, undefined, 2))
    })
})

router.delete('/:id', (req, res)=>{
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("No record with given id: "+req.params.id)

    modelModel.findByIdAndRemove(req.params.id, (err, docs)=>{
        if(!err) res.send(docs)
        else console.log("error while removing  records "+ JSON.stringify(err, undefined, 2))
    })
})

module.exports = router