const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
  mail: { type: String, required: true },
  password: { type: String, required: true },
  token:{type: String, required: true}
});

module.exports = mongoose.model('Login', loginSchema);