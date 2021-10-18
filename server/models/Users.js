const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    line1: { type: String },
    line2: { type: String },
  },
  role: {
    type: String,
    default: "General",
  },
  mobile: {
    type: Number,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

module.exports = mongoose.model("Users", usersSchema);
