/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { createQuestion, getQuestions, getQuestionById } = require('./controllers/questions');
const { createUser, getUsers, updateUser } = require('./controllers/users');

const dotenv = require('dotenv');
const cors = require('cors');
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({
    path: './settings.env',
  });
}

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello World!'));

// POST a question
app.post('/questions', createQuestion);

// GET all questions
app.get('/questions', getQuestions);

// GET a specific question by ID
app.get('/questions/:questionId', getQuestionById);

// POST a user
app.post('/users', createUser);

// GET all users
app.get('/users', getUsers);

// PUT / UPDATE a user
app.put('/users/:phoneNo', updateUser);

mongoose.connect(process.env.DATABASE_CONN, () => {
  console.log('connected to database');
  app.listen(port, () => {
    console.log(`server listening ${port}`);
  });
});

module.exports = app;
