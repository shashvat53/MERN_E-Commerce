const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: { type: String },
    role: String,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema); // Capitalized model name for convention
module.exports = userModel;
