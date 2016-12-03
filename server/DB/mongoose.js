//DEPLOY APP TO HEROKU --> will need to set up a REAL mongodb database

//Take mongoose DB Configuration code from server2.js

var mongoose = require('mongoose');  //require from mongoose library

mongoose.Promise = global.Promise;      //set it up to use Promises
// mongoose.connect('mongodb://localhost:27017/TodoApplication');
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/TodoApp`);
//export the mongoose variable
    //when someone requires THIS FILE, they will have mongoose configured and will
    // get back the mongoose variable that comes from the library
module.exports = {mongoose};
