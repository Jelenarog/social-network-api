const {User, Thought }= require('../models');

module.exports = {

  //get all thoughts
  getThought(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

    //get one thought
    getSingleThought(req, res) {
      Thought.findById(
        {_id:req.params.thoughtId}
      )
        .then((thoughts) => res.json(thoughts))
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
      .then((newThought) =>
       res.json("new thought has been created")
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
      return User.findOneAndDelete(
        { username: req.body.username },
        { $pull: { thoughts: thought._id } },
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

}

