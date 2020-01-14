const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: String,
  password: String,
  email: String
});

module.exports = model("User", UserSchema);
