const express = require('express')
const axios = require('axios')
var router = express.Router()
const utf8 = require('utf8')
var theData = require('./content/data.json')

const axiosFunstion = async (keyword) => {
    //const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.708632,73.092444&radius=50000&keyword='+keyword+'&key=AIzaSyAyMM_F894tsbISsPQ8ScqCIQ_ez_QJRiQ'
    //const url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum of Contemporary Art Australia&inputtype=textquery&fields=formatted_address,name,rating,opening_hours,geometry&key=AIzaSyAyMM_F894tsbISsPQ8ScqCIQ_ez_QJRiQ'
    const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query='+utf8.encode(keyword)+'&key=AIzaSyAyMM_F894tsbISsPQ8ScqCIQ_ez_QJRiQ'
    let res = await axios.get(url)
    return res.data.results
}

const fetchData = async (keywords) => {
    var dataArray = [];

    await Promise.all(keywords.map(async (item) => {
        let theData = await axiosFunstion(item)
        dataArray.push(theData)
    }));
    
    return dataArray
}

const nextCharacter = (c) => {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

router.get('/', async (req, res)=>{
    var theKeyWords = []
    var areas = [
        'RAWALPINDI G.P.O.'
        ,'RAWALPINDI MOMIN PURA'
        ,'RAWALPINDI URDU BAZAR'
        ,'RAWALPINDI WESTRIDGE'
        ,'RAWALPINDI KOHINOOR COLONY'
        ,'GENERAL HEAD QUARTER RAWALPINDI'
        ,'MURREE BREWARY'
        ,'CHAKLALA AIR FIELD RAWALPINDI'
        ,'BAHRIA TOWN'
        ,'RAWALPINDI SATELLITE TOWN'
        ,'RAWALPINDI JUDICIAL TOWN'
        ,'RAWALPINDI RAJA TOWN'
        ,'RAWALPINDI FIZAIA COLONY'
        ,'PIR WADHAI'
        ,'DHAMIAL CAMP RAWALPINDI'
        ,'RAWALPINDI KUTCHERY'
        ,'RAWALPINDI CHAK JALAL DIN'
        ,'ATTOCK OIL COMPANY RAWALPINDI'
        ,'RAWALPINDI HIGH COURT'

    ]
    areas.map((value)=>{
        req.body.keywords.map(item=>{
            theKeyWords.push(item.keyword+' in '+value+' Faisalabad')
        })
    })
    //res.send(theKeyWords)
    var filteredData = []
    let responseData = await fetchData(theKeyWords)
    responseData.forEach(element => {
        element.forEach(item=>{
            filteredData.push(item)
        })
    })

    var uniqueData = []

    filteredData.map((item)=>{
        if(!uniqueData.find(element => element == item.reference)){
            uniqueData.push(item)
        }
    })
    
    res.send(uniqueData)
})

router.get('/data', async (req, res)=>{
    res.send(theData)
})

router.get('/filterTags', async (req, res)=>{
    var filterArray = []
    await req.body.map((item)=>{
        filterArray.push(item.types)
    })
    res.send(filterArray)
})

router.get('/uniqueTags', async (req, res)=>{
    var uniqueArray = []
    var dataArray = []
    await req.body.map((item)=>{
        item.map(element=>{
            dataArray.push(element)
        })
    })

    await dataArray.map((item)=>{
        if(!uniqueArray.find(element => element == item)){
            uniqueArray.push(item)
        }
    })

    res.send(uniqueArray)
})



module.exports = router