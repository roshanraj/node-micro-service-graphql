var express = require('express');
var router = express.Router();
var request = require('request');
var rp = require('request-promise');
var uri = require('../junk/test.js');

function getdata(url){
    var qs = {
        uri:url
    }
    return rp(qs).then(function(data){
        return JSON.parse(data)
    })
        .catch(function(err){
            console.log(err);
        })
}


router.get('/', async function(req, res, next){
    var body = await getdata("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty");
    var temp = [];
    for (var x in body){
       
        temp[x] = rp("https://hacker-news.firebaseio.com/v0/item/"+body[x]+".json?print=pretty")
                        .then(function(data){
                            // console.log(data);
                            return JSON.parse(data)
                        })
                        .catch(function(err){
                           
                        })
    }
    var nbody = await Promise.all(temp).catch(err => { 
        console.log(err);
    });
    let resBody = {
        'status':'ok',
        'body':nbody
    }    
    res.status(200).send(resBody);
});

module.exports = router;