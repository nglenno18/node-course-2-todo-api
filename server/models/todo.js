//We call mongoose.model so still have to call mongoose
//dont have to load in mongoose.js file we created, we can load in the plain ol library
var mongoose = require('mongoose');


//create a model for everything we want to score: a ToDo model
var Todo = mongoose.model('Todo', {
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


//export the model, otherwise we cannot use it in files that require this one
module.exports = {Todo};
