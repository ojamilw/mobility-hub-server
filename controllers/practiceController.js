const express = require('express')
var router = express.Router()
var concat = require('concat-stream');

router.post('/', (req, res)=>{
    res.send(JSON.stringify(req.body))
})


module.exports = router