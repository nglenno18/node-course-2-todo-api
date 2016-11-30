//npm init
//npm install mongodb@2.2.5 --save

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', function(error, db){
  if(error){
      return console.log('Unable to Connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  //insert new record into a Collection
  //Todos Collection and Users Collection
  // db.collection('Todos').insertOne({
  //   text: 'Something to Do',
  //   completed: false
  // }, function(error, result){
  //   if(error){
  //     return console.log('Unable to insert todo', err);
  //   }
  //   //log the array of objects that were inserted
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  //CHALLENGE: comment out that code
    //Insert a new doc into Users (name, age, location), pass new collection name into collection mehtod

  db.collection('UsersCollection').insertOne({
    name: 'Amy',
    age: 52,
    location: 'Downers Grove, IL'
  }, function(error, result){
    if(error){
      return console.log('Unable to insert todo', error);
    }
    // console.log(JSON.stringify(result.ops, undefined, 2));
    console.log(result.ops[0]._id.getTimestamp());  //_id embeds a timestamp
  });

  //call method on db to close connection to mongo db server
  db.close();
  //run file: cmd: node playground/mongodb-connect.js
});

//Mongo _id is not incremental, it is random, allowing mongo database to scale up (add more servers)
// _id: 12 byte value
  //first 4 bytes = timestamp
  //next 3 bytes = machine identifier
  //2 bytes = process id
  //3 bytes = counter
