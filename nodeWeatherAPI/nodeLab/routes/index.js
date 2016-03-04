var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile('weather.html', { root:  'public' });
});

router.get('/getcity',function(req,res,next) {
//    console.log("In getcity route");
    var myRe = new RegExp("^" + req.query.q);
//    console.log(myRe);
    fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
        if(err) throw err;
        var cities = data.toString().split("\n");
        var jsonresult = [];
        for(var i = 0; i < cities.length; i++) {
            var result = cities[i].search(myRe);
            if(result != -1) {
//                console.log(cities[i]);
                jsonresult.push({city:cities[i]});
            }
        }
	res.status(200).json(jsonresult);
//	console.log(jsonresult);
    })
});

router.get('/:file',function(req,res,next){

	var file = req.params.file;
	res.sendFile(file);//,options,funnction(err){
});

router.get('/reverse/string',function(req,res,next){

	console.log(req.query.string);
	var str = req.query.string;
	var split = str.split(" ");
	split.reverse();
	var resultStr = "";
	for(var i = 0;i<split.length;i++){
		resultStr += split[i] + " ";
	}
	var result = {"string":resultStr};
	console.log(result);
res.status(200).json(result);
//	res.setHeader(200, {"Content-Type": "application/json"});
//	res.json(result);
});

router.get('/reverse/word',function(req,res,next){

	console.log(req.query.word);
        var str = req.query.word;
        var split = str.split("");
        split.reverse();
        var resultStr = "";
        for(var i = 0;i<split.length;i++){
                resultStr += split[i];
        }
        var result = {"string":resultStr};
	console.log(result);
        res.status(200).json(result);

});

router.get('/count',function(req,res,next){

	console.log(req.query.string);
        var str = req.query.string;
        var split = str.split("");
        split.reverse();
	var vowel = 0;
	var cons = 0;
        var resultStr = "";
        for(var i = 0;i<split.length;i++){
                if(split[i] === 'a' || split [i] === 'e' || split[i] === 'i' ||
			split[i] === 'o' || split[i] === 'u' || split[i] === 'A' ||
			split[i] === 'E' || split[i] === 'I' || split[i] === 'O' ||
			split[i] === 'U'){
			vowel++;
		} else {
			cons++;
		}
        }
        var result = {"length":split.length,"vowel":vowel,"cons":cons};
	console.log(result);
        res.status(200).json(result);

});

module.exports = router;
