const { Schema, model } = require("mongoose");

const WordsSchema = new Schema({
  word: String,
  stem: String,
  category: String,
  createdOn: { type: Date, default: Date.now() },
  definition: String,
  addedBy: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = model("Word", WordsSchema);
