const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId
var { universalServiceModel } = require('../models/dbModels')


router.get('/', (req, res)=>{
    universalServiceModel.find((err, docs)=> {
        if(!err) res.send(docs)
        else res.send("error while retrieving user all records "+ JSON.stringify(err, undefined, 2))
    })
})

router.get('/:id', (req, res)=>{
    universalServiceModel.find({_id:req.params.id},(err, docs)=> {
        if(!err) res.send(docs)
        else res.send("error while retrieving user all records "+ JSON.stringify(err, undefined, 2))
    })
})

router.post('/', (req, res)=>{
    res.send(req.body)
    var newRecord = new universalServiceModel({
        category: req.body.category,
        service: req.body.service,
        type: req.body.type,
    })

    newRecord.save((err, docs)=>{
        if(!err) res.send(docs)
        else res.send("error while saving user records "+ JSON.stringify(err, undefined, 2))
    })
})

router.delete('/:id', (req, res)=>{
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("No record with given id: "+req.params.id)

    universalServiceModel.findByIdAndRemove(req.params.id, (err, docs)=>{
        if(!err) res.send(docs)
        else res.send("error while removing user records "+ JSON.stringify(err, undefined, 2))
    })
})

module.exports = router