const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId

var { brandModel } = require('../models/dbModels')

router.get('/', (req, res)=>{
    brandModel.find((err, docs)=> {
        if(!err) res.send(docs)
        else console.log("error while retrieving  all records "+ JSON.stringify(err, undefined, 2))
    })
})

router.post('/', (req, res)=>{
    var newRecord = new brandModel({
        name: req.body.name,
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

    brandModel.findByIdAndUpdate(req.params.id, {$set: updateRecord}, (err, docs)=>{
        if(!err) res.send(docs)
        else console.log("error while updating  records "+ JSON.stringify(err, undefined, 2))
    })
})

router.delete('/:id', (req, res)=>{
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("No record with given id: "+req.params.id)

    brandModel.findByIdAndRemove(req.params.id, (err, docs)=>{
        if(!err) res.send(docs)
        else console.log("error while removing  records "+ JSON.stringify(err, undefined, 2))
    })
})

module.exports = router