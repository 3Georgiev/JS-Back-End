const mongoose = require("mongoose");

const accessorySchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
});

const Accesory = mongoose.model("Accesory", accessorySchema);

module.exports = Accesory;
