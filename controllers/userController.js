const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId

var { userModel } = require('../models/userModel')

router.get('/', (req, res)=>{
    userModel.find((err, docs)=> {
        if(!err) res.send(docs)
        else console.log("error while retrieving user all records "+ JSON.stringify(err, undefined, 2))
    })
})

router.post('/', (req, res)=>{
    var newRecord = new userModel({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        type: req.body.type,
        pass: req.body.pass
    })

    newRecord.save((err, docs)=>{
        if(!err) res.send(docs)
        else console.log("error while saving user records "+ JSON.stringify(err, undefined, 2))
    })
})

router.post('/login', (req, res)=>{
    console.log(req)
    /*userModel.find({email:req.body.uname, pass:req.body.pass}, (err, docs)=> {
        if(!err) res.send(docs)
        else console.log("error while retrieving user all records "+ JSON.stringify(err, undefined, 2))
    })*/
})

router.put('/:id', (req, res)=>{
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("No record with given id: "+req.params.id)

    var updateRecord = {
        name: req.body.name,
        pass: req.body.pass
    }

    userModel.findByIdAndUpdate(req.params.id, {$set: updateRecord}, (err, docs)=>{
        if(!err) res.send(docs)
        else console.log("error while updating user records "+ JSON.stringify(err, undefined, 2))
    })
})

router.delete('/:id', (req, res)=>{
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("No record with given id: "+req.params.id)

    userModel.findByIdAndRemove(req.params.id, (err, docs)=>{
        if(!err) res.send(docs)
        else console.log("error while removing user records "+ JSON.stringify(err, undefined, 2))
    })
})

module.exports = router