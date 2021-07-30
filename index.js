require('./db')
const express = require('express') 
const bodyParser = require('body-parser')
var cors = require('cors')
var concat = require('concat-stream');
var userRoutes = require('./controllers/userController')
var practiceRoutes = require('./controllers/practiceController')
var app = express()

app.use(cors())
app.use(express.json())
const port = 8080;

app.use('/user', userRoutes)
app.use('/practice', practiceRoutes)

app.listen(port, ()=>console.log(`Server Started at ${port}`))
