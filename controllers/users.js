const User = require('../models/users.js');

// POST a user

exports.createUser = (req, res) => {
  const user = new User({
    phoneNo: req.body.phoneNo,
    previousResponses: req.body.previousResponses,
  });
  user.save((err, userCreated) => {
    if (err) {
      res.send('POST request for creating a user failed.');
    }
    res.json(userCreated);
  });
};

// GET all users

exports.getUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.json('Something went wrong, please try again.');
    }
    res.json(users);
  });
};

// PUT/ UPDATE a specific user by ID

exports.updateUser = (req, res) => {
  User.findOne({ phoneNo: req.params.phoneNo }, (err, user) => {
    if (err) {
      res.json('Could not find user');
    }
    user.set({ previousResponses: req.body.previousResponses });
    user.save((updateErr, userUpdated) => {
      if (updateErr) {
        res.json('Could not update user previous responses');
      }
      res.json(userUpdated);
    });
  });
};
