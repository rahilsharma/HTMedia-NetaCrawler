/**
 * Created by rs on 25/11/15.
 */
var request = require('request');
var cheerio = require('cheerio');
var rootUrl='http://myneta.info/';
var stateUrl='';
var state="Delhi";
var stateYrs=[];
var stateYrsLinks=[];
var winnerListYearwise=[];
var options = {
    url:rootUrl,
    headers: {
        'User-Agent': 'Mozilla'
    }
};
console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
console.log("Hitting " +  rootUrl);
console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
request(options, function callback(error, response, body) {
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    console.log("Got Delhi Url " );
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        $ = cheerio.load(body);
        var l=$('.item').children().closest('a');
    for(var ii=0;ii< l.length ; ii++){
        if(l[ii].children[0].data == state){
            stateUrl=l[ii].attribs.href;
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
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    console.log("Hitting " +  stateUrl);
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    request(options, function callback(error, response, body) {
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log("Got Results ::: Finding Url Yearwise " );
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            $ = cheerio.load(body);
            var l=$('.item').children().closest('h3');
        for (var xx=0;xx< l.length;xx++){
            stateYrs.push(l[xx].children[0].data);
            stateYrsLinks.push(l[xx].next.next.attribs.href);
        }
        getWinnerList(stateYrsLinks);
        }
    );
}
function getWinnerList(stateYrsLinks){
var len=stateYrsLinks.length;
    for(var gg=0;gg<len;gg++){
        savelisttoDB(stateYrsLinks[gg],gg);
    }
}
function savelisttoDB(stateYrsLink,gg){

    options = {
        url:stateYrsLink,
        headers: {
            'User-Agent': 'Mozilla'
        }
    };
    request(options, function callback(error, response, body) {
        var tmpArray=[];
            $ = cheerio.load(body);
            var l=$('.tableFloatingHeaderOriginal').nextAll();
        for(var kkk=0;kkk< l.length;kkk++){
            tmpArray.push(l[kkk].children[2].next.children[0].children[0].children[0].data);
        }

        winnerListYearwise.push(tmpArray);
        console.log(stateYrsLink);
        console.log(tmpArray);

        }
    );
}