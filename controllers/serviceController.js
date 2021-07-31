const express = require('express')
var router = express.Router()

var { serviceModel } = require('../models/serviceModel')

router.get('/', (req, res)=>{
    serviceModel.find((err, docs)=> {
        if(!err) res.send(docs)
        else console.log("error while retrieving user all records "+ JSON.stringify(err, undefined, 2))
    })
})

module.exports = router