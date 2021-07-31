require('./db')
const express = require('express') 
var cors = require('cors')
var userRoutes = require('./controllers/userController')
var practiceRoutes = require('./controllers/practiceController')
var serviceRoutes = require('./controllers/serviceController')
var cateogryRoutes = require('./controllers/categoryController')
var brandRoutes = require('./controllers/brandController')
var skuRoutes = require('./controllers/skuController')

var app = express()

app.use(cors())
app.use(express.json())
const port = 8080;

app.use('/user', userRoutes)
app.use('/service', serviceRoutes)
app.use('/practice', practiceRoutes)
app.use('/category', cateogryRoutes)
app.use('/brand', brandRoutes)
app.use('/sku', skuRoutes)

app.listen(port, ()=>console.log(`Server Started at ${port}`))
