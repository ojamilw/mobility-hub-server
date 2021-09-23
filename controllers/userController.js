const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId
var { userModel, mobilityPartnerModel, rating_reviewModel } = require('../models/dbModels')
const fs = require('fs')

router.get('/', (req, res)=>{
    userModel.find((err, docs)=> {
        if(!err) res.send(docs)
        else res.send("error while retrieving user all records "+ JSON.stringify(err, undefined, 2))
    })
})
/*

{ $project: { "<field1>": 0, "<field2>": 0, ... } }
*/
router.get('/type/:id',  (req, res)=>{
    userModel.aggregate([
        {
            $addFields: {
                "userObjectId": {
                    "$toString": "$_id"
                }
            }
        },
        {
            $lookup: {
                from: "rating_reviews", 
                localField: "userObjectId",
                foreignField: "serviceProvider",
                as: "rating_review"
            }
        },
    ], async (err, docs)=> {
        if(!err) {
            var newData = await docs.filter(element=>element.type == req.params.id)
            res.send(newData.slice(0, 10))
        }
        else res.send("error while retrieving user all records "+ JSON.stringify(err, undefined, 2))
    })
})

router.get('/mapType',  (req, res)=>{
    userModel.find((err, docs)=> {
        if(!err) {
            res.send(docs)
        }
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

router.post('/checking', (req, res)=>{
    userModel.find({$or:[{email:req.body.email}, {phone:req.body.phone}]},(err, docs)=> {
        if(!err) res.send(docs)
        else res.send("error while retrieving user all records "+ JSON.stringify(err, undefined, 2))
    })
})

router.post('/consumer', (req, res)=>{
    var newRecord = new userModel({
        business_status : 'Operational',
        formatted_address : 'No Address',
        geometry : [],
        icon : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
        name : req.body.name,
        photos : [
            {
                "height" : 270,
                "html_attributions" : [
                    "\u003ca href=\"https://maps.google.com/maps/contrib/112645299799014875645\"\u003eA Google User\u003c/a\u003e"
                ],
                "photo_reference" : "Aap_uEAT174hx9lAQL3RBdV0qTf0nUbCnx4Q1PMRIJlCoFPXpOGW3oi51_enTMcOJIvG8HKlazXeJIUIrxX7yN0FW51FzLRK8DcbSA4dDlbGtDJlxu4oa5vRIZNn0wDCWrPW7oQy-zTksFsrKhS0X3llC6gK37cQhOLMvseV1_gdGRvKRsvI",
                "width" : 480
            }
        ],
        reference : 'NO ID',
        types : [],
        parther_site: false,
        active_status: true,
        description:"no description",
        email:req.body.email,
        phone:req.body.phone,
        social:[
            {
                "google": "",
                "facebook":""
            }
        ],
        password: req.body.pass,
        type: 2, 
    })

    newRecord.save((err, docs)=>{
        if(!err) {
            req.body.partners.map((item)=> {
                var new_data = new mobilityPartnerModel({
                    name: item.nickName,
                    make: item.make,
                    nameID: item.makeID,
                    year: item.year,
                    yearID: item.yearID,
                    model: item.model,
                    modelID: item.modelID,
                    version: item.version,
                    versionID: item.versionID,
                    consumer: docs._id
                })
                new_data.save((error, docs)=>{
                    if(error) console.log(error)
                })
            })
            res.send(docs)
        }
        else res.send("error while saving user records "+ JSON.stringify(err, undefined, 2))
    })
})

router.post('/image/:id', (req, res)=>{
    try {
        fs.writeFile(`./uploads/profile-${req.params.id}.png`, req.body.imgsource, 'base64', (err) => {
            if (err) res.send(err)
            else res.send(true)
        })
    } catch (error) {
        console.log(error)
    }
})

router.get('/image/:id', (req, res)=>{
    if (fs.existsSync(`./uploads/profile-${req.params.id}.png`)) {
        res.send({profile: true})
    } else {
        res.send({profile: null})
    }
})

router.post('/login', (req, res)=>{
    userModel.find({ $and: [ {email:req.body.email}, {password:req.body.pass} ] }, (err, docs)=> {
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