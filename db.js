const mongoose = require("mongoose")
mongoose.connect('mongodb+srv://zain:YrnT0taaSbbarCdv@mobilityhub.bbuyh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology:true},
err => {
    if(!err)
        console.log("DB connected");
    else
        console.log("DB Error "+JSON.stringify(err))
});


// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://zain:<password>@mobilityhub.bbuyh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
