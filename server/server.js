/*
  Section 7, Lecture 74 --> Testing POST/ todos

  Set up the test suite for the API, writing 2 test cases form /todos

  Verify that when we send the correct data as the body, we get a 200 status code

  Before we do any of this, we have to install new modules
      -expect for assertions
      - mocha for test suite
      - supertest to test express routes
      - nodemon to create test-watch script so we can auto start the test suite

  //run npm i expect@1.20.2 mocha@3.0.2 nodemon@1.10.2 supertest@2.0.0 --save-dev
  create new folder server/tests to save test files (test file for server.js)
*/
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');  //CAN leave off the .js ext
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

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


app.listen(3000, function(){
  console.log('Started on port 3000');
});

module.exports = {app};
