const {User}= require('../models');

module.exports = {
  //get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  
 //get one user
 getSingleUser(req, res) {
  User.findOne({_id: req.params.userId})
    .select('-__v')
    .populate('thoughts')
    .populate('friends')
    .then((oneUser) => res.json(oneUser))
    .catch((err) => res.status(500).json(err));
},

 //update user
 updateUser(req, res) {
  User.findOneAndUpdate(
    {_id: req.params.userId},
    { $set: req.body },
    
    )
    .then((oneUser) => res.json(oneUser))
    .catch((err) => res.status(500).json(err));
},

 //delete user
 deleteUser(req, res) {
  User.findOneAndDelete({_id: req.params.userId})
    .then((oneUser) => res.json(oneUser))
    .catch((err) => res.status(500).json(err));
},


 // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
 },
};
