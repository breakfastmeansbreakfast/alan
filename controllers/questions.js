// Controller for handling '/Questions' get requests
const mongoose = require('mongoose');
const question = require('../models/questions.js');

// POST a question

exports.createQuestion = (req, res) => {
  const question = new question ({
    question: req.body.question,
  });
  question.save((err, questionCreated) => {
    if (err) {
      res.send("POST request for creating a question failed.");
    }
    res.json(questionCreated);
  });
}; 

// GET all questions

exports.getQuestions = (req, res) => {
  res.send('GET request for list of all questions');
};

// GET a specific question by ID

exports.getQuestionById = (req, res) => {
  res.send('GET request for specific question via ID');
};