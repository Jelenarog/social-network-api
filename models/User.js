// Define Mongoose
const mongoose = require('mongoose');

// Create a new instance of the Mongoose schema to define shape of each document
const userSchema = new mongoose.Schema({

    username: { type: String, unique: true ,required: true },
    email: { type: String, unique: true ,required: true },
    price: Number,
    thoughts: ,
    friends:,

    // Use built in date method to get current date
   // lastAccessed: { type: Date, default: Date.now },
  });

// grocerySchema is the name of the schema we are using to create a new instance of the model
const User = mongoose.model('User', userSchema);



  module.exports = User;