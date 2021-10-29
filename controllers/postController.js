const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId
const moment = require('moment')
const fs = require('fs')

var { postModel, userModel } = require('../models/dbModels')

router.get('/', (req, res)=>{
    postModel.find((err, docs)=> {
        if(!err) res.send(docs.sort(function(a,b){return b.name > a.name}))
        else console.log("error while retrieving  all records "+ JSON.stringify(err, undefined, 2))
    })
})

var getUser = (id) => {
    return userModel.find({_id:id}, (err, docs)=> {return err ? false : docs})
}

router.post('/', async (req, res)=>{
    var allImages = req.body.images
    const currentTime = moment().format().toString().replace(/-/g, '').replace(/:/g, '').replace('+', '')
    var theImages = []
    if(allImages.length > 0){
        await allImages.map(async (element, index)=>{
            var theName = `img${currentTime}-${index}`
            theImages.push(theName)
            await fs.writeFile(`./uploads/posts/${theName}.png`, element, 'base64', (err) => {
                if (err) console.log(err)
            })
        })
    }
    
    var theUser = ObjectID.isValid(req.body.id) ? getUser(req.body.id) : false
    if(theUser){
        theUser.then(userData=>{
            if(userData[0]){
                var newRecord = new postModel({
                    user: userData[0],
                    description: req.body.desc,
                    images: theImages,
                    datetime: Date.now(),
                    review_rating: [],
                    avg_rating: 0,
                    count_rating: 0
                })
                newRecord.save((err, docs)=>{
                    if(!err) res.send(docs)
                    else res.send("error while saving  records "+ JSON.stringify(err, undefined, 2))
                })
            } else {
                res.send('Invalid User')
            }
        })
    } else res.send('Invalid User')
})

module.exports = router