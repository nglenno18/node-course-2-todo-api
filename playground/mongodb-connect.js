/*
  SECTION 7, Lecture 64 -- The Object ID
    - change the import statement to load in something new off of
    mongodb using ES6 feature "Object Destructuring"
*/
// const MongoClient = require('mongodb').MongoClient; -- change to Destructuring
//const {MongoClient} = require('mongodb'); //pull any property from mongodb -->
                                                //only property we have is MongoClient
const {MongoClient, ObjectID} = require('mongodb');
var obj = new ObjectID();
console.log(obj);

var user = {name: 'Nolan', age: 19};
//Destructure this user objects
var {name} = user;  //pulled out the name property, creating new name variable
console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', function(error, db){
  if(error){
    return console.log('Unable to Connect to MongoDB Server');
  }
  console.log('Connected to the MongoDB Server');

  db.close();
});
