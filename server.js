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
   
   console.log(messages); 
   res.render('index', {messages: messages});
  })
})


app.post('/message', function(req, res) {
   var msg = new Message(req.body);
  console.log('POST: ', req.body)
  console.log("process: ", msg)
  msg.save(function(err) {
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added');
    }
  })
 res.redirect('/');
})

/*app.post('/comic', function(req, res) {
   var comic = new Comic({name: req.body.sname, publisher: req.body.pub, init_date: req.body.inidate, description: req.body.desc});
  comic.save(function(err) {
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added');
    }
  })
 res.redirect('/');
})*/

var MessageSchema = new mongoose.Schema({
msg_name: String,
msg_txt: String,
msg_date: Date
})
var Message = mongoose.model('Message', MessageSchema);

var CommentSchema = new mongoose.Schema({
comment_name: String,
comment_txt: String,
comment_date: Date,
msg_id: Number
})
var Comment = mongoose.model('Comment', CommentSchema);


app.listen(8000, function() {
 console.log("listening on port 8000");
})