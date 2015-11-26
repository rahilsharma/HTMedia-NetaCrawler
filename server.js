/**
 * Created by rs on 25/11/15.
 */
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var rootUrl='http://myneta.info/';
var stateUrl='';
var state="Delhi";
var options = {
    url:rootUrl,
    headers: {
        'User-Agent': 'Mozilla'
    }
};

request(options, function callback(error, response, body) {
        $ = cheerio.load(body);
        var l=$('.item').children().closest('a');
    for(var ii=0;ii< l.length ; ii++){
        if(l[ii].children[0].data == state){
          // console.log(l[ii].attribs.href);
            stateUrl=l[ii].attribs.href;
   //now that we have href lets hit
hitstatePage(stateUrl);
        }
    }


    }

);
function hitstatePage(stateUrl){
    options = {
        url:stateUrl,
        headers: {
            'User-Agent': 'Mozilla'
        }
    };
    request(options, function callback(error, response, body) {
            $ = cheerio.load(body);
            var l=$('.item').children().closest('h3');
          //  console.log(l.length);
        for (var xx=0;xx< l.length;xx++){
            console.log(l[xx].next.next.attribs.href);
        }


        }

    );
}