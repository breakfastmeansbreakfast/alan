

// MODELS

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: String,
  previousResponses: Array,
});

module.exports = mongoose.model('User', userSchema);


