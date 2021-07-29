require('./db')
const bodyParser = require('body-parser')
const express = require('express') 
var cors = require('cors')
var userRoutes = require('./controllers/userController')

var app = express()
app.use(cors())
app.use(bodyParser.json())
const port = 8080;
app.listen(port, ()=>console.log(`Server Started at ${port}`))
app.use('/user', userRoutes)
