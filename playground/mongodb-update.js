/*
  SECTION 7, Lecture 68 -- updating Data
*/

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', function(error, db){
  if(error){
    return console.log('Unable to Connect to MongoDB Server');
  }
  console.log('Connected to the MongoDB Server');

  //update the completed status of a Todo to TRUE
  //db.collection('Todos').findOneAndUpdate(filter, update, options, callback)
  //leave off the callback in favor of promise
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('583e43e720c201bfdd2b1dc2')
  // }, //now actual updates we want to apply
  //   {
  //     $set: {       //NEED THESE UPDATE OPERATORS
  //       completed: true
  //     }
  //   }, {
  //     returnOriginal: false
  //   })
  //   .then(function(result){
  //     console.log(result);
  //   });


//CHALLENGE: update the Name of a user object in UsersCollection, increment the age
db.collection('UsersCollection').findOneAndUpdate({
  _id: new ObjectID('583e22158ab544a3d7ccc5c8')
}, {
  $set:{
    name: 'Nolan Updated'
  },
  $inc: {
    age: +1
  }
}, {
  returnOriginal: false
})
.then(function(res){
  console.log(res);
});
  //db.close();


  //connecting to the MONGODB Server
  // cd / --> cd program files/mongodb/server/3.4/bin
  //dir (lists files)
  //mongod.exe -dbpath /users/glenn/mongo-data
});
