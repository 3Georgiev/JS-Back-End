const mongoose = require("mongoose");

const electronicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    minLength: [10, "Name is too short!"],
  },
  type: {
    type: String,
    required: [true, "Type is required!"],
    minLength: [2, "Type is too short!"],
  },
  damages: {
    type: String,
    required: [true, "Damages is required!"],
    minLength: [10, "Damages is too short!"],
  },
  image: {
    type: String,
    required: [true, "Image is required!"],
    match: [/https?:\/\//g, "Please provide valid image URL!"],
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
    minLength: [10, "Description text too short!"],
    maxLength: [200, "Description text too long!"],
  },
  production: {
    type: Number,
    required: [true, "Prodcuction year is required!"],
    min: [1900, "Prodcuction year must be between 1900 and 2023!"],
    max: [2023, "Prodcuction year must be between 1900 and 2023!"],
  },
  exploitation: {
    type: Number,
    required: [true, "Exploitation is required!"],
    min: [1, "Exploitation must be a positive number!"],
  },
  price: {
    type: Number,
    required: [true, "Price is required!"],
    min: [1, "Price must be a positive number!"],
  },
  buyingList: Array,
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Electronic = mongoose.model("Electronic", electronicSchema);

module.exports = Electronic;
