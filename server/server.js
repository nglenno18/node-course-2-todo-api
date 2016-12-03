
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');


var {mongoose} = require('./db/mongoose.js');  //CAN leave off the .js ext
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
//
const port = process.env.PORT || 3000;  //variable will be set if running on heroku, but not if running localport


app.use(bodyParser.json());

app.post('/todos', function(request, response){
  //bodyparser takes JSON, converts to object
  console.log(request.body); //body gets stored by the bodyParser^^^

  //now actually create a todo from input from the User
  var todo = new Todo({
    text: request.body.text
  });

  todo.save().then(function(doc){
    response.send(doc);
  }, function(error){
    response.status(400).send(error);
    console.log('Unable to create the Todo: ');
    console.log(error.errors.text.message);
  });
});

app.get('/todos', function(request, response){
  Todo.find().then(function(todos){
    response.send({todos});
  }, function(error){
    response.status(400).send(error);
  });
});

app.get('/todos/:id', function(request, response){

  var id = request.params.id;
      Todo.findById(id).then(function(todo){
        if(!todo){                        //Weeds out VALID, but MISSING id
          console.log('');
          //response.send({todo});
          return response.status(404).send('ID MISSING: Valid Id not found!');
        }
        console.log('');
        console.log('User By ID', todo);
        console.log('');
        response.send({todo});
      })
        .catch(function(error){
          //console.log('ID NOT VALID', id);
          console.log('       ', error.message);
          console.log('');
          return response.status(404).send('ID NOT VALID');
        });
});

// app.listen(3000, function(){
app.listen(port, function(){
  console.log(`Started on port ${port}`);
  //NOW ammend the package.json file to tell HEROKU how to start the project (start script)
  //CREATE new heroku app in terminal
      //heroku CREATE
      //heroku addons:create mongolab:sandbox //configures mlab with heroku app
      //heroku config (gives us the URI var we need)
            // URI is on process.env

});

module.exports = {app};
