const {User, Thought }= require('../models');

module.exports = {

  //get all thoughts
  getThought(req, res) {
    Thought.find()
      .then((allThoughts) => res.json(allThoughts))
      .catch((err) => res.status(500).json(err));
  },

    //get one thought
    getSingleThought(req, res) {
      Thought.findById(
        {_id:req.params.thoughtId}
      )
        .then((oneThought) => res.json(oneThought))
        .catch((err) => res.status(500).json(err));
    },

  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then(() =>
       res.json("New thought has been created")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },


 // update a thought
 updateThought(req, res) {
  Thought.findOneAndUpdate(
    {_id: req.params.thoughtId},
    { $set: req.body },
   )
    .then((thought) => {
      return User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
    })
    .then(() =>
     res.json("Thought has been updated")
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},

// delete a thought
deleteThought(req, res) {
  Thought.findOneAndDelete(
    {_id: req.params.thoughtId},
   )
    .then((thought) => {
      return User.deleteMany(
        { _id: {  $in: User.thoughts} },
        { new: true }
      );
    })
    .then(() =>
     res.json("Thought has been deleted")
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},

// create a reaction from thought
createReaction(req, res) {
  Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      { $addToSet: {reactions: req.body} },
      )

    .then((dbThought) => res.json(dbThought))
    .catch((err) => res.status(500).json(err));
},


 //delete a reaction from thought
 deleteReaction(req, res) {
  Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      { $pull: {reactions: { reactionId: req.body.reactionId}} },
      { new: true },
      )

    .then(() => res.json('Thought has been deleted.'))
    .catch((err) => res.status(500).json(err));
},


}

