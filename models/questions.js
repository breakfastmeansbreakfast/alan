// MODELS

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({ 
  questionId: Number,
  question: String,
  category: String,
});

module.exports = mongoose.model('Question', questionSchema);
