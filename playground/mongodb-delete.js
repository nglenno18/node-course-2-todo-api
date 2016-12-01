/*
  SECTION 7, Lecture 65 -- Fetching Data (QUERYING)
    - change the import statement to load in something new off of
    mongodb using ES6 feature "Object Destructuring"
*/

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', function(error, db){
  if(error){
    return console.log('Unable to Connect to MongoDB Server');
  }
  console.log('Connected to the MongoDB Server');

  //DELETE MANY -- lets us target and remove documents
  // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then(function(result){
  //   console.log(result);    //top of result object is ok = 1 and n = 3 items that were deleted
  // })

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then(function(result){
  //   console.log(result);      //shut down current connection and rerun
  // });

  // findOneAndDelete   -- i dont know what the text is or ID
  //     //target Todos that have a completed value set to false
  // db.collection('Todos').findOneAndDelete({completed: false}).then(function(result){
  //   console.log(result);
  // });   //produces a LastErrorObject (just has Todos that were deleted)


  //SELECT ALL QUERY in Todos
  // db.collection('Todos').find().toArray()
  //   .then(function(result){
  //     console.log(JSON.stringify(result, undefined, 2));
  //  });
  //db.close();


  //connecting to the MONGODB Server
  // cd / --> cd program files/mongodb/server/3.4/bin
  //dir (lists files)
  //mongod.exe -dbpath /users/glenn/mongo-data
});
