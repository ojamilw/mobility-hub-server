const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/mobilityHub',{useNewUrlParser:true, useUnifiedTopology:true},
err => {
    if(!err)
        console.log("DB connected");
    else
        console.log("DB Error "+JSON.stringify(err))
})