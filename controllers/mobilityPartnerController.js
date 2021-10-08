const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId

var { mobilityPartnerModel } = require('../models/dbModels')

router.get('/', (req, res)=>{
    mobilityPartnerModel.find((err, docs)=> {
        if(!err) res.send(docs)
        else console.log("error while retrieving  all records "+ JSON.stringify(err, undefined, 2))
    })
})

router.get('/:id', (req, res)=>{
    mobilityPartnerModel.find({consumer: req.params.id},(err, docs)=> {
        if(!err) res.send(docs)
        else console.log("error while retrieving  all records "+ JSON.stringify(err, undefined, 2))
    })
})

router.post('/', (req, res)=>{
    var newRecord = new mobilityPartnerModel({
        name: req.body.nickName,
        make: req.body.make,
        nameID: req.body.makeID,
        year: req.body.year,
        yearID: req.body.yearID,
        model: req.body.model,
        modelID: req.body.modelID,
        version: req.body.version,
        versionID: req.body.versionID,
        consumer: req.body.id
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

    mobilityPartnerModel.findByIdAndUpdate(req.params.id, {$set: updateRecord}, (err, docs)=>{
        if(!err) res.send(docs)
        else console.log("error while updating  records "+ JSON.stringify(err, undefined, 2))
    })
})

router.delete('/:id', (req, res)=>{
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("No record with given id: "+req.params.id)

    mobilityPartnerModel.findByIdAndRemove(req.params.id, (err, docs)=>{
        if(!err) res.send(docs)
        else console.log("error while removing  records "+ JSON.stringify(err, undefined, 2))
    })
})

module.exports = router