const {User, Thought }= require('../models');

module.exports = {

  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },//filter
          { $addToSet: { thoughts: thought._id } },//what to add/update
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Post created, but found no user with that ID' })
          : res.json('Created the post 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

//to delete
//findOneAndRemove
//$pull



};
