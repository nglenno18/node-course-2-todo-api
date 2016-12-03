
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');


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

app.get('/todos', function(request, response){
  Todo.find().then(function(todos){
    response.send({todos});
  }, function(error){
    response.status(400).send(error);
  });
});

// Section 7, Lecture 78 --> Getting an Individual Resource - GET /todos/:id
//
// GET /todos/123421342423
//   - fetch that value (make that part dynamic), and USE it to make a QUERY
app.get('/todos/:id', function(request, response){
  // //params is a key-value pair
  // response.send(request.params);
  var id = request.params.id;
  //CHALLENGE 78
  //Validate id using isValid
    //error is 404 --> send back an empty body
    if(!ObjectID.isValid(id)){
      console.log('ID NOT VALID!');
      console.log('');
    }
    //
  //Query the DB using findById()
    //success
      //if todo -- send back
      //if no todo (call succeed, ID not found in collection) --> 404 empty body
    //error
      //400 -
      Todo.findById(id).then(function(todo){
        if(!todo){                        //Weeds out VALID, but MISSING id
          console.log('');
          response.send({todo});
          return response.status(404).send('ID MISSING: Valid Id not found!');
        }
        console.log('');
        console.log('User By ID', todo);
        console.log('');
        response.send({todo});
      })
        .catch(function(error){
          console.log('ID NOT VALID', id);
          console.log('        ', error.message);
          console.log('');
          response.status(404).send(error);
        });
});

app.listen(3000, function(){
  console.log('Started on port 3000');
});

module.exports = {app};
