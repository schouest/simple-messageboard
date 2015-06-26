//TODO: calc date on server.js; fix comment not having msg id; display comments

var path = require("path");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/msg_board');

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
 
 Message.find({}, function(err, messages) {
  if (err) {return console.error(err);}
  
      Comment.find({}, function(err, comments) {
        if (err) {return console.error(err);}
        
              res.render('index', {messages:messages, comments:comments});
        })


  })
})


app.post('/message', function(req, res) {
   var msg = new Message(req.body);
  msg.save(function(err) {
    if(err) {
      console.log('something went wrong');
    } else {
      console.log('successfully added');
    }
  })
 res.redirect('/');
})

app.post('/comment', function(req, res) {
   var comment = new Comment(req.body);
   console.log(comment);
  comment.save(function(err) {
    if(err) {
      console.log('something went wrong');
    } else {
      console.log('successfully added');
    }
  })
 res.redirect('/');
})

var MessageSchema = new mongoose.Schema({
msg_name: String,
msg_txt: String,
msg_date: Date
})
var Message = mongoose.model('Message', MessageSchema);

var CommentSchema = new mongoose.Schema({
com_name: String,
com_txt: String,
com_date: Date,
msg_num: String
})
var Comment = mongoose.model('Comment', CommentSchema);


app.listen(8000, function() {
 console.log("listening on port 8000");
})