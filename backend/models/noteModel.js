const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  userId: { type: String, required: true },
});

module.exports = Note = mongoose.model("note", noteSchema);
