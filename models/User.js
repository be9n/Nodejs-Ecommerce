const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const User = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minLength: [3, "The name should be between 3 to 50 characters"],
    maxLength: [50, "The name should be between 3 to 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide the email"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  password: {
    type: String,
    // select: false,
    required: [true, "Please provide the password"],
    minLength: [6, "The name should be at least 6 characters"],
  },
  role: {
    type: String,
    enum: ["admin", "buyer"],
    default: "buyer",
  },
});

User.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

User.methods.comparePassword = async function (reqPassword) {
  return bcrypt.compare(reqPassword, this.password);
};

User.set('toJSON', {
  transform: function(doc, ret, opt) {
      delete ret['password']
      return ret
  }
})

module.exports = mongoose.model("User", User);
