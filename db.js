const mongoose = require("mongoose")
var uri = 'mongodb+srv://zain:YrnT0taaSbbarCdv@mobilityhub.bbuyh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology:true},
err => {
    if(!err)
        console.log("DB connected");
    else
        console.log("DB Error "+JSON.stringify(err))
});
