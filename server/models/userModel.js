const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  mail: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  gender: { type: String, required: true },
  qualification: { type: String, required: true },
  image: { type: Object, required: true },
});

module.exports = mongoose.model('User', userSchema);