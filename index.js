require('./db')
const bodyParser = require('body-parser')
const express = require('express') 
var cors = require('cors')
var userRoutes = require('./controllers/userController')

var app = express()
app.use(cors())
app.use(bodyParser.json())

app.listen(4000, ()=>console.log("Server Started at : 4000"))
app.use('/user', userRoutes)
