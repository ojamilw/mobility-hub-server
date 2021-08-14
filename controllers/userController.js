const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId
var { userModel } = require('../models/dbModels')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


router.get('/', (req, res)=>{
    userModel.find((err, docs)=> {
        if(!err) res.send(docs)
        else res.send("error while retrieving user all records "+ JSON.stringify(err, undefined, 2))
    })
})

router.get('/type/:id', (req, res)=>{
    userModel.find({type:req.params.id},(err, docs)=> {
        if(!err) res.send(docs)
        else res.send("error while retrieving user all records "+ JSON.stringify(err, undefined, 2))
    })
})

router.get('/:id', (req, res)=>{
    userModel.find({_id:req.params.id},(err, docs)=> {
        if(!err) res.send(docs)
        else res.send("error while retrieving user all records "+ JSON.stringify(err, undefined, 2))
    })
})

router.post('/', (req, res)=>{
    res.send(req.body)
    var newRecord = new userModel({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        type: req.body.type, 
        pass: req.body.pass
    })

    newRecord.save((err, docs)=>{
        if(!err) res.send(docs)
        else res.send("error while saving user records "+ JSON.stringify(err, undefined, 2))
    })
})

router.post('/image', (req, res)=>{
    res.send("all is well")
    // newRecord.save((err, docs)=>{
    //     if(!err) res.send(docs)
    //     else res.send("error while saving user records "+ JSON.stringify(err, undefined, 2))
    // })
})

router.post('/login', (req, res)=>{
    userModel.find({email:req.body.email, pass:req.body.pass}, (err, docs)=> {
        if(!err) res.send(docs)
        else res.send("error while retrieving user all records "+ JSON.stringify(err, undefined, 2))
    })
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
        else res.send("error while updating user records "+ JSON.stringify(err, undefined, 2))
    })
})

router.delete('/:id', (req, res)=>{
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("No record with given id: "+req.params.id)

    userModel.findByIdAndRemove(req.params.id, (err, docs)=>{
        if(!err) res.send(docs)
        else res.send("error while removing user records "+ JSON.stringify(err, undefined, 2))
    })
})

module.exports = router