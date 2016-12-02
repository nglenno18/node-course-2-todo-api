const expect = require('expect');
const request = require('supertest');

//add module.exports = {app}; to server.js so you can load it
//load in serv.js for access to express app
const {app}  = require('./../server');
//load in our TodoModel for querying database
const {Todo} = require('./../models/todo');


//make an array of dummy todos for the GET request test
const todos = [{
  text: 'First Test todo'
}, {
  text: 'Second Test todo'
}];

//now we have to modify beforeEach, using mongoose method to insert docs into collection
//LifeCycle method
beforeEach(function(done){
  //will run before every test case and will ONLY move on once we call done
      // this means we can do something asynchronous
  //Call remove and pass an empty object to WIPE OUT all of the todos.
      //add a .then callback and call done when finished
  //Todo.remove({}).then(() => done());
  //NEW version:
    //now we have to modify beforeEach, using mongoose method to insert docs into collection
    Todo.remove({}).then(() => {
      Todo.insertMany(todos);   //fill with dummy array
    }).then(()=> done()); //tack on done call
});

describe('POST /todos', function(){
  //TEST CASE 1
    it('should create a new todo', function(done){
      var text = 'Test todo text';

      request(app)
          .post('/todos')
          .send({text})
          .expect(200)
          .expect(function(response){
              // expect(response.body.text).toBe(text);
              expect(response.body.text).toBe(text + ''); //will result in an error
          })
          .end(function(error, res){
            if(error){
              return done(error) //returning the result just stops the function
            }
            //make a request to db fetching all the todos and verifying that OUR one todo was indeed added
            Todo.find({text}).then(function(todos){
              expect(todos.length).toBe(1); //THIS ASSUMES THAT THE DB IS EMPTY!!!!!!!
                                            //(need to add a testing lifecycle method) up top
              expect(todos[0].text).toBe(text);
              done();   //if both pass, call done and wrap up test case, but if they fail test will still pass
                        //so we need to tack on a catch call and take that error arg and pas it into the greater done function
            }).catch(function(error){done(error)});

          });      //instead of passing (done), pass a callback function

    });

    //TEST CASE 2 Challenge
    it('Should NOT create todo with invalid body data', function(done){
      //no need to make text variable, we are passing in NOTHING
      //make post request to same url, but send send as empty object so that we get a 400
          //pass a callback to end, check for errors, and make assumptions about DB
      request(app)
          .post('/todos')
          .send({})
          .expect(400)
          .end(function(error, res){
            if(error){
              return done(error);
            }
            Todo.find().then(function(todos){
              // expect(todos.length).toBe(0);     //since sending in bad data, should not create any todos
              expect(todos.length).toBe(2);   //because of our new dummy todos
              done();
            }).catch(function(error){done(error)});
          });
    });

}); //now we need to set up the scripts in package.json to run it
    //test: "mocha server/**/*.test.js".
    //"test-watch": "nodemon --exec "npm test""



//TESTING GET /todos new describe block
describe('GET /todos', function(){
  it('Should get all todos', (done)=> {
    request(app)
        .get('/todos')
        //not sending any data in the test body, BUT we are making assertions on what comes back
        .expect(200)
        .expect(function(res){
          expect(res.body.todos.length).toBe(2);
        })
        .end(done); //not ding any fancy on end because not doing anything asynchronously
  });
});
