const mongoose = require("mongoose");
const validator = require('validator');

const User = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minLength: [3, 'The name should be between 3 to 50 characters'],
    maxLength: [50, 'The name should be between 3 to 50 characters']
  },
  email: {
    type: String,
    required: [true, "Please provide the email"],
    unique: true,
    validate: {
        validator: validator.isEmail,
        message: 'Please provide valid email'
    }
  },
  password: {
    type: String,
    required: [true, "Please provide the password"],
    minLength: [6, 'The name should be at least 6 characters'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
});

module.exports = mongoose.model("User", User);
