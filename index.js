require('./db')
const express = require('express') 
var cors = require('cors')


var userRoutes = require('./controllers/userController')
var practiceRoutes = require('./controllers/practiceController')
var serviceRoutes = require('./controllers/serviceController')
var cateogryRoutes = require('./controllers/categoryController')
var brandRoutes = require('./controllers/brandController')
var skuRoutes = require('./controllers/skuController')
var definedServiceRoutes = require('./controllers/definedServiceController')
var parserControllerRoutes = require('./controllers/parserController')
var rating_reviewControllerRoutes = require('./controllers/rating_reviewController')
var universalServiceControllerRoutes = require('./controllers/universalServiceController')
var makeControllerRoutes = require('./controllers/makeController')
var yearControllerRoutes = require('./controllers/yearController')
var modelConrollerRoutes = require('./controllers/modelController')
var versionControllerRoutes = require('./controllers/versionController')
var mapControllerRoutes = require('./controllers/mapController')
var mobilityPartnerRoutes = require('./controllers/mobilityPartnerController')

var app = express()

app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
const port = 8080

app.use('/uploads', express.static('uploads'))

app.use('/user', userRoutes)
app.use('/service', serviceRoutes)
app.use('/practice', practiceRoutes)
app.use('/category', cateogryRoutes)
app.use('/brand', brandRoutes)
app.use('/sku', skuRoutes)
app.use('/definedService', definedServiceRoutes)

app.use('/rating_review', rating_reviewControllerRoutes)
app.use('/universalService', universalServiceControllerRoutes)

app.use('/make', makeControllerRoutes)
app.use('/year', yearControllerRoutes)
app.use('/model', modelConrollerRoutes)
app.use('/version', versionControllerRoutes)
app.use('/myvehicle', mobilityPartnerRoutes)

app.use('/map', mapControllerRoutes)

app.use('/parser', parserControllerRoutes)

app.listen(port, ()=>console.log(`Server Started at ${port}`))
