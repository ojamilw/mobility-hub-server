const mongoose = require("mongoose")
mongoose.connect('mongodb+srv://zain:YrnT0taaSbbarCdv@mobilityhub.bbuyh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology:true},
err => {
    if(!err)
        console.log("DB connected");
    else
        console.log("DB Error "+JSON.stringify(err))
});
