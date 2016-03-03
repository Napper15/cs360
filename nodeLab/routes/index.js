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
//	var options = {
//	  root: __dirname + '/public/',
//	  dotfiles: 'deny',
//	  headers: {
//	    'x-timestamp': Date.now(),
//	    'x-sent': true
//	  }
//	};
	res.sendFile(file);//,options,funnction(err){
//		if(err){
//			res.status(err.status).end();
//		}
//	});
});

module.exports = router;
