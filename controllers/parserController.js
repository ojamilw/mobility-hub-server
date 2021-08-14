const express = require('express')
var router = express.Router()
var { userModel } = require('../models/dbModels')

router.post('/', (req, res)=>{
    var data = req.body
    var i = 0;
    var records = []
    data.map((item) => {
        i++;
        var email = `email${i}@gmail.com`;
        var newRecord = new userModel({
            business_status : item.business_status,
            formatted_address : item.formatted_address,
            geometry : item.geometry,
            icon : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
            name : item.name,
            photos : [
                {
                    "height" : 270,
                    "html_attributions" : [
                        "\u003ca href=\"https://maps.google.com/maps/contrib/112645299799014875645\"\u003eA Google User\u003c/a\u003e"
                    ],
                    "photo_reference" : "Aap_uEAT174hx9lAQL3RBdV0qTf0nUbCnx4Q1PMRIJlCoFPXpOGW3oi51_enTMcOJIvG8HKlazXeJIUIrxX7yN0FW51FzLRK8DcbSA4dDlbGtDJlxu4oa5vRIZNn0wDCWrPW7oQy-zTksFsrKhS0X3llC6gK37cQhOLMvseV1_gdGRvKRsvI",
                    "width" : 480
                }
            ],
            reference : item.reference,
            types : [ "car_repair" ],
            parther_site: false,
            active_status: true,
            description:"no description",
            email:email,
            phone:"",
            social:[
                {
                    "google": "",
                    "facebook":""
                }
            ],
            password: "123",
            type: 1, 
        });

        try {
            newRecord.save((err, docs)=>{
                if(err) res.send("error while saving user records "+ JSON.stringify(err, undefined, 2))
                else records.push(docs[0])
            })
        } catch (error) {
            console.log(error)
        }
    })
})


module.exports = router