/*
  Section 7, Lecture 70 --> MONGOOSE orm
  Mongoose ORM (Object Relations Management)

  npm i mongoose@4.5.9 --save
*/

var mongoose = require('mongoose');  //require from mongoose library

mongoose.Promise = global.Promise;      //set it up to use Promises
mongoose.connect('mongodb://localhost:27017/TodoApplication');

//save new something --> by the time this statement runs, mongoose.connect
// will not have made a request to connect.
// mongo is going to be waiting for the connection before it ever actually tries to make a query
//Do Not need to micro manage the order, like MongoEDB requires

//create a model for everything we want to score: a ToDo model
var Todo = mongoose.model('TodoModel', {
  //object that defines various properties for the model
  text:{
    //specify the details of the attribute
    type: String
  },
  completed:{
    type: Boolean
  },
  completedAt:{
    type: Number
  }
});

var newTodo = //run the Todo function we just coded AS A CONSTRUCTOR function
              new Todo({
                text: 'Cook Dinner'
              });

//creating a new instance alone DOES NOT actually update the MongoDB database
//Instead, call a method on the new Todo
// newTodo.save().then(function(doc){
//   console.log('Saved Todo:', doc);
//   //returns object with an __v property (keeps track of Version changes over time)
// }, function(error){
//   console.log('Unable to save the Todo', error);
// });

//CHALLENGE: make a new Todo with all three properties filled
newTodo = new Todo({
  text: 'Make an Omelette',
  completed: false,
  completedAt: 0
});
newTodo.save().then(function(res){    //tack on then callback bc I wanna do something after it runs
  console.log('Saved Todo', res);
}, function(err){
  console.log('Unable to save the Todo', error);
})
