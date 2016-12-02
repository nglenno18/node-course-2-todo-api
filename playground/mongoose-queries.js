
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5841e8ddfada4de84e24acef'; //VALID
//var id = '5851e8ddfada4de84e24acef'; //VALID, BUT MISSING
//var id = '5841e8ddfada4de84e24acef11'; //INVALID ID



//find
// Todo.find({
//   _id: id //
// }).then(function(todos){
//   console.log('');
//   console.log('Todos\n', todos);
//   console.log('');
// });
//
// //findOne
// Todo.findOne({
//   _id: id
// }).then(function(todo){   //DIFFERENCE: todos --> todo
//   console.log('Todo\n', todo);
//   console.log('');
// });


// const {ObjectID} = require('mongodb');
// if(!ObjectID.isValid(id)){
//   console.log('ID NOT VALID!');
//   console.log('');
// }
//
//findById
Todo.findById(id).then(function(todo){
  //HANDLE FAULTY ID
  if(!todo){
    return console.log('ID NOT FOUND!\n');    //Will handle a Valid, BUT MISSING ID
  }
  console.log('Todo By ID\n', todo);
  console.log('');
})
  .catch((error)=>{                  //CATCH will handle an INVALID ID
    // console.log(error)
    console.log('CATCH: ');
    console.log('     ', error.message);
    console.log('');
  }
  //Instead of catch method, load in obj id of mongodb Native drive uptop
        //const {ObjectID} = require('mongodb');
);

// UserModel.find().then(function(users){
//   console.log('');
//   console.log('USers\n', users);
//   console.log('');
// });
//
var id = '5841f27faf4b519130ac5a50';

User.findById(id).then(function(user){
  if(!user){                        //Weeds out VALID, but MISSING id
    console.log('');
    return console.log('ID MISSING: Valid Id not found!');
  }
  console.log('');
  console.log('User By ID', user);
  console.log('');
})
  .catch(function(error){
    console.log('ID NOT VALID', id);
    console.log('        ', error.message);
    console.log('');
  });
