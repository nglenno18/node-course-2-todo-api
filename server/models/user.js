//We call mongoose.model so still have to call mongoose
//dont have to load in mongoose.js file we created, we can load in the plain ol library
var mongoose = require('mongoose');

var User = mongoose.model('User', {
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

module.exports = {User};
