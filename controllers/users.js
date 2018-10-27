

// Controller for handling '/Questions' get requests
const mongoose = require('mongoose');
const User = require('../models/users.js');

// POST a user

exports.createUser = (req, res) => {
  const user = new User ({
    userId: req.body.userId,
    previousResponses: req.body.previousResponses,
  });
  user.save((err, userCreated) => {
    if (err) {
      res.send("POST request for creating a user failed.");
    }
    res.json(userCreated);
  }); 
};

// GET all users

exports.getUsers = (req, res) => {
  res.send('GET request for list of all users');
};

// PUT/ UPDATE a specific user by ID

exports.updateUserById = (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) {
      res.json('Could not find user');
    }
    user.set({ previousResponses: req.body.previousResponses });
    question.save((updateErr, userUpdated) => {
      if (updateErr) {
        res.json('Could not update user previous responses');
      }
      res.json(userUpdated);
    });
  });
};

