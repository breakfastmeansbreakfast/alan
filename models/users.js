// MODELS

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  phoneNo: String,
  previousResponses: Array,
});

module.exports = mongoose.model('User', userSchema);
