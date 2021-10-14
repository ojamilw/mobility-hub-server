const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId

var { yearModel } = require('../models/dbModels')

router.get('/', (req, res)=>{
    yearModel.find((err, docs)=> {
        if(!err) res.send(docs.sort(function(a,b){return parseInt(b.name) - parseInt(a.name)}))
        else console.log("error while retrieving  all records "+ JSON.stringify(err, undefined, 2))
    })
})

router.post('/', (req, res)=>{
    var newRecord = new yearModel({
        name: req.body.name,
    })

    newRecord.save((err, docs)=>{
        if(!err) res.send(docs)
        else console.log("error while saving  records "+ JSON.stringify(err, undefined, 2))
    })
})

router.post('/bulk', async (req, res)=>{
    var i = 2000
    while (i <= 2018){
        var newRecord = new yearModel({
            name: i,
        })
    
        newRecord.save((err, docs)=>{
            if(err) console.log("error while saving  records "+ JSON.stringify(err, undefined, 2))
        })

        i++
    }
    res.send(true)
})

router.put('/:id', (req, res)=>{
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("No record with given id: "+req.params.id)

    var updateRecord = {
        name: req.body.name,
    }

    yearModel.findByIdAndUpdate(req.params.id, {$set: updateRecord}, (err, docs)=>{
        if(!err) res.send(docs)
        else console.log("error while updating  records "+ JSON.stringify(err, undefined, 2))
    })
})

router.delete('/:id', (req, res)=>{
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("No record with given id: "+req.params.id)

    yearModel.findByIdAndRemove(req.params.id, (err, docs)=>{
        if(!err) res.send(docs)
        else console.log("error while removing  records "+ JSON.stringify(err, undefined, 2))
    })
})

module.exports = router