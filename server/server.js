/*
  Section 7, Lecture 73 --> Resource Configuration Endpoint

  REFACTOR the server.js files

  //FIRST 3 Lines of DB Configuration should live in different file
        var mongoose = require('mongoose');  //require from mongoose library

        mongoose.Promise = global.Promise;      //set it up to use Promises
        mongoose.connect('mongodb://localhost:27017/TodoApplication');

  //MODELS SHOuld also live in seperate files --> new Directotry inside Server Directory: DB
*/

//LIBRARY Imports
//LOAD in the 2 modules we installed when we refactored this file (express, body-parser)
var express = require('express');
var bodyParser = require('body-parser');

//LOCAL Imports
//Mongoose Config should be in DB/mongoose.js file
var {mongoose} = require('./db/mongoose.js');  //CAN leave off the .js ext
//now load in Todo and UserModel
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

//NOW, Server.js file is ONLY responsible for our ROUTES
//need to now install express and body-parser
// npm i express@4.14.0 body-parser@1.15.2 --save

var app = express();
//Inside of Rest APIs --> Basic CRUD Operations
    //CRUD --> (Create, Read, Update, Delete)
    //Create a resource, use the post http method and send that resource a s a body

      //this means that to make a new Todo, we send a JSON obj to the server that will have a txt property,
      //server createes new model from text property and sends new completed model back to the client

//configure middleware with app.use
//bodyparser takes JSON, converts to object
//return value from the json is a function and THAT is the MIDDLEWARE we need to give to express
app.use(bodyParser.json());

//set up a ROUTES
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


app.listen(3000, function(){
  console.log('Started on port 3000');
});
