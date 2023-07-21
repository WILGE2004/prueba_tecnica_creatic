const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  versionKey: false,
});

module.exports = mongoose.model("users", UserSchema);
