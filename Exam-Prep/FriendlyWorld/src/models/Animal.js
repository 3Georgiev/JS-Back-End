const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    minLength: [2, "Name is too short!"],
  },
  years: {
    type: Number,
    required: [true, "Years are required!"],
    min: [1, "Years must be more than 1!"],
    max: [100, "Years must be less than 100!"],
  },
  kind: {
    type: String,
    required: [true, "Kind is required!"],
    minLength: [3, "Kind is too short!"],
  },
  imageUrl: {
    type: String,
    required: [true, "Image is required!"],
    match: [/https?:\/\//g, "Please provide valid image URL!"],
  },
  need: {
    type: String,
    required: [true, "Need is required!"],
    minLength: [3, "Need text too short!"],
    maxLength: [20, "Need text too long!"],
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
    minLength: [5, "Description text too short!"],
    maxLength: [50, "Description text too long!"],
  },
  location: {
    type: String,
    required: [true, "Location is required!"],
    minLength: [5, "Location text too short!"],
    maxLength: [15, "Location text too long!"],
  },
  donations: Array,
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;
