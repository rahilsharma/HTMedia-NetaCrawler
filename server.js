/**
 * Created by rs on 25/11/15.
 */
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var rootUrl='http://myneta.info/';
var options = {
    url:rootUrl,
    headers: {
        'User-Agent': 'Mozilla'
    }
};

request(options, function callback(error, response, body) {
        // console.log('cm here');
        $ = cheerio.load(body);
        var l=$('.item').children().closest('a');
//console.log(l.length);
  //    console.log(l[0].children[0].data);
    //console.log(l[0].attribs.href)
    for(var ii=0;ii< l.length ; ii++){
        if(l[ii].children[0].data == "Delhi"){

        }
    }
        //if (kk=chngvr.length-1){
        //   //callback function
        //    console.log(kk);
        //  printglobalArray();
        //}

    }

);