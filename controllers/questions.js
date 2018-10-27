// Controller for handling '/Questions' get requests
const mongoose = require('mongoose');
const Question = require('../models/questions.js');

// POST a question

exports.createQuestion = (req, res) => {
  const question = new Question ({
    questionId: req.body.questionId,
    question: req.body.question,
    category: req.body.category,
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
  Question.find({}, (err, questions) => {
    if (err) {
      res.json('Something went wrong, please try again.');
    }
    res.json(questions);
  });
};

// GET specific question by ID

exports.getQuestionById = (req, res) => {
  Question.findOne({ questionId }, function (err, question){
    if (err) {
      res.json('Could not find question');
    }
    res.json(question);
  });
};

// PUT/ UPDATE a specific question by ID

exports.updateQuestionById = (req, res) => {
  User.findById(req.params.questionId, (err, user) => {
    if (err) {
      res.json('Could not find question');
    }
    question.set({ question: req.body.question });
    question.set({ category: req.body.category });
    question.save((updateErr, questionUpdated) => {
      if (updateErr) {
        res.json('Could not update question');
      }
      res.json(questionUpdate);
    });
  });
};