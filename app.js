const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const { createQuestion, getQuestions, getQuestionById } = require('./controllers/questions'); 

const dotenv = require('dotenv').config({
  path: './settings.env',
});

const app = express();
app.use(bodyParser.json());
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

// POST a question
app.post('/questions', createQuestion);

// GET all questions
app.get('/questions', getQuestions);

// GET a specific question by ID
app.get('/questions/:questionID', getQuestionById);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));