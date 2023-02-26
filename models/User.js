// Define Mongoose
const mongoose = require('mongoose');

// Create a new instance of the Mongoose schema to define shape of each document
const userSchema = new mongoose.Schema({

    username: { 
      type: String, 
      unique: true,
      required: true, 
      trim: true,
    },
    email: { 
      type: String,
       unique: true,
       required: true,
       // match:/.+\@.+\..+/
       validate: {
        validator: function(v) {
            return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
        },
       
    },
      },
    price: Number,
    thoughts: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'thought' 
    }],
    friends: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'user' 
    }],

  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  });

  userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

// grocerySchema is the name of the schema we are using to create a new instance of the model
const User = mongoose.model('user', userSchema);



  module.exports = User;