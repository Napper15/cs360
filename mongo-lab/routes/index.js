var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/commentDB');

var commentSchema = mongoose.Schema({
  Name: String,
  Comment: String
});

var Comment = mongoose.model('Comment', commentSchema);

var db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('connected');
});

router.get('/delete',function(req,res,next){
  Comment.remove({},function(err){
    if(err) console.log(err);
    
});
  res.sendStatus(200);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET comments from database */
router.get('/comment', function(req, res, next) {
  console.log("In the GET route?");
  Comment.find(function(err,commentList) { //Calls the find() method on your database
    if (err) return console.error(err); //If there's an error, print it out
    else {
      console.log(commentList); //Otherwise console log the comments you found
	res.json(commentList);      
      
    }
  })
});

router.post('/comment', function(req, res, next) {
  console.log("POST comment route"); //[1]
//  console.log(req.body);
  var newcomment = new Comment(req.body);
  console.log(newcomment);
  newcomment.save(function(err,post){
    if(err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  });
});

module.exports = router;
