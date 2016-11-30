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

//Just added a document into Todos
//1
  db.collection('Todos').find().toArray()  //returns the documents
  .then(function(docs){           //toArray returns a promise, can take on then call and callback
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, function(error){
    console.log('Unable to fetch "Todos"');
  });
  console.log('');

  //2
  //Query that fetchs ONLY the Todos that have a completed status is false
  db.collection('Todos').find({completed: false})
    .toArray()
    .then(function(docs){
      console.log('2 -- Todos that HAVE NOT BEEN COMPLETED');
      console.log(JSON.stringify(docs, undefined, 2));
    }, function(error){
      console.log(`SOMETHING WENT WRONG:
      Unable to fetch the "Todos" that have not been completed`, error);
  });

  //3
  //Query that fetchs ONLY the Todos that have a completed status is false
      //Query by _id property, NOT by entire Object (cannot input id as string, its an OBJ ID)
    db.collection('Todos').find({_id: new ObjectID('583e16bb8ab544a3d7ccc133')})
      .toArray()
      .then(function(docs){
        console.log('3 -- Todo that have the specific Object ID: 583e16bb8ab544a3d7ccc133');
        console.log(JSON.stringify(docs, undefined, 2));
      }, function(error){
        console.log(`SOMETHING WENT WRONG:
        Unable to fetch the "Todos" that have not been completed`, error);
    });

  //4
  //using a PROMISE and mongoDB's count method  (Node.js MongoDB Driver API)
  db.collection('Todos').find()
    .count()
    .then(function(count){
      console.log(`Todos count: ${count}`);
    }, function(error){
      console.log('Unable to fetch todos', error);
    });

    //CHALLENGE: Query that returns every Todo with the name 'Nolan', regardless of _id
    db.collection('UsersCollection').find({name: 'Nolan'})
      .toArray()
      .then(function(docs){
        console.log('Challenge: Query returning every object with name value "Nolan"');
        console.log(JSON.stringify(docs, undefined, 2));
      }, function(error){
        console.log('Something went wrong', error);
      });
  //db.close();
});
