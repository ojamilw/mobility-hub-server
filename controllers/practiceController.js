const express = require('express')
var router = express.Router()
var concat = require('concat-stream');
var data = require('./content/data.json')
var filteredData = require('./content/filteredData.json')
var unrelatedData = require('./content/unrelatedData.json')
const tags = ['car_repair', 'gas_station', 'car_wash', 'convenience_store', 'car_dealer', 'car_rental', 'atm']

var { userModel } = require('../models/dbModels')


router.post('/', (req, res)=>{
    res.send(JSON.stringify(req.body))
})

router.get('/theData', async (req, res)=>{
    var newArray = []
    await data.map(async element=>{
        await tags.map(y=>{
            if(element.types.filter(x=>x===y).length > 0) newArray.push(element)
        })
    })

    // var uniqueTags = []
    // await newArray.map(element => {
    //     element.types.map(x=>{
    //         if(uniqueTags.filter(y=>y===x).length === 0) uniqueTags.push(x)
    //     })
    // })
    // console.log(uniqueTags)

    res.send(newArray)
})

router.get('/checkData', async (req, res)=>{
    var newArray = []
    await userModel.find({type:1},async function(err, docs){
        if(!err) {
            newArray = await docs 
        }
    })
    res.send(newArray)
})

router.get('/unrelatedData', async (req, res)=>{
    var newArray = []
    await data.map(async element=>{
        if(filteredData.filter(x=>x.reference === element.reference).length === 0) newArray.push(element)
    })
    res.send(newArray)
})

router.get('/unrelatedDataFilteration', async (req, res)=>{
    await unrelatedData.map( async (element)=>{
        let doc = await userModel.findOneAndDelete({reference:element.reference})
        console.log(doc.types)
    })
    res.send('all is well')
})

router.get('/unrelatedDataValidation', (req, res)=>{
    userModel.find({type:1}, (err, docs)=>{
        if(err) res.send(err)
        else res.send(docs.length.toString())
    })
})

router.get('/dataParsing', async (req, res)=>{
    await filteredData.map( async (element)=>{
        let doc = await userModel.findOneAndUpdate({reference:element.reference}, {types:element.types}, {new:true})
        console.log(doc.types)
    })
    res.send('all is well')
})




module.exports = router