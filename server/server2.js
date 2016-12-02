/*
  Section 7, Lecture 70 --> MONGOOSE orm
  Mongoose ORM (Object Relations Management)

  npm i mongoose@4.5.9 --save
*/

var mongoose = require('mongoose');  //require from mongoose library

mongoose.Promise = global.Promise;      //set it up to use Promises
mongoose.connect('mongodb://localhost:27017/TodoApplication');

//^^^ 3 lines of DB Configuration should live somewhere else (seperate files)


//save new something --> by the time this statement runs, mongoose.connect
// will not have made a request to connect.
// mongo is going to be waiting for the connection before it ever actually tries to make a query
//Do Not need to micro manage the order, like MongoEDB requires

//create a model for everything we want to score: a ToDo model
var Todo = mongoose.model('TodoModel', {
  //object that defines various properties for the model
  text:{
    //specify the details of the attribute
    type: String,
    required: true,
    minLength: 1,
    trim: true          //trims off any white space, blank spaces
  },
  completed:{
    type: Boolean,
    default: false
  },
  completedAt:{
    type: Number,
    default: null
  }
});

// var newTodo = //run the Todo function we just coded AS A CONSTRUCTOR function
//               new Todo({
//                 text: 'Cook Dinner'
//               });
//
// //CHALLENGE: make a new Todo with all three properties filled
// newTodo = new Todo();
//     //Only establishes a Version and ID properties
//     //We SHOULD NOT BE ADDONG TODOs if they don't have required properties
//     //use Mongoosejs.com/docs/validation.html and mongoose schemas guide to set defaults and validations
//     // go back up top, when defining the Model, add 'required' to property
// newTodo = new Todo({
//   text: '      Edit this Todo Document    '   //trim property edits this string
// });
//
//
// newTodo.save().then(function(res){    //tack on then callback bc I wanna do something after it runs
//   console.log('Saved Todo');
//   console.log(JSON.stringify(res, undefined, 2));
// }, function(err){
//   console.log('Unable to save the Todo', err);
// });


//MODELS SHOULD BE LIVING IN SEPERATE file




//CHALLENGE: Create a brand new Mongoose Model (User Model)
//Eventually we use it for authentication (email, password)
//set up email property
var UserModel = mongoose.model('User', {
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  email: {
    type: String,
    required: true,
    minLength: 6,
    trim: true
  }
});

var newUser = new UserModel({
  name: 'Nolan',
  email: 'nglenno'
});

newUser.save().then(function(res){
  console.log('Saved User: ', res.name);
  console.log('     Email: ', res.email);
}, function(err){
  console.log('Unable to Save User', err);
  console.log('Unable to Save User: ', err.message);
  //console.log(err.errors.email.message);
  console.log('INVALID PROPERTY: ');
  if(err.errors.email){
    console.log('                ', err.errors.email.message);
  }else
  if(err.errors.name){
    console.log('                ', err.errors.name.message);
  }
});
