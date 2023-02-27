
   // Define Mongoose
const mongoose = require('mongoose');

const Reaction = require('./Reaction');
// Create a new instance of the Mongoose schema to define shape of each document
const thoughtSchema = new mongoose.Schema({

    thoughtText: { 
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
     },
    createtAd: { 
        type: Date,
         default: Date.now,
         },
    username: { 
        type: String,
         required: true,
         },
    reactions:[Reaction] ,

  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  });

  thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

// grocerySchema is the name of the schema we are using to create a new instance of the model
const Thought = mongoose.model('thought', thoughtSchema );



  module.exports = Thought;