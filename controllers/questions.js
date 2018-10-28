// Controller for handling '/Questions' get requests
const mongoose = require('mongoose');
const Question = require('../models/questions.js');

const clockwork = require('clockwork')({ key: 'bda6f6f63cb6aca638e229783db06237c0d5f155' });

const conversationTopics =
  [
    'What`s your favourite now defunct airline?',
    'Would you rather an army of 100 bees or 2 polar bears?',
    'Which vegetable would you choose to be a super hero?',
    'what`s the best way to dispose of a body?',
    'How often do you wash your towels?',
    'what is the best thing?',
  ];

const getRandomIndex = (array) => {
  const randomNumber = Math.floor(Math.random() * (array.length - 1));
  console.log(array[randomNumber]);
  return array[randomNumber];
};

const sendresponse = (phoneno, message) => {
  clockwork.sendSms({ To: phoneno, Content: message }, (error, resp) => {
    if (error) {
      console.log('Something went wrong', error);
    } else {
      console.log('Message sent to', resp.responses[0].to);
      console.log('MessageID was', resp.responses[0].id);
    }
  });
};
// POST a question

exports.createQuestion = (req, res) => {
  const question = new Question ({
    questionId: req.body.questionId,
    question: req.body.question,
    category: req.body.category,
  });
  question.save((err, questionCreated) => {
    if (err) {
      res.send('POST request for creating a question failed.');
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
    sendresponse(req.query.from, getRandomIndex(conversationTopics));
    res.json('OK');
  });
};

// GET specific question by ID

exports.getQuestionById = (req, res) => {
  Question.findOne({ questionId }, function (err, question) {
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
