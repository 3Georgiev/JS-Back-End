const Accessory = require("../models/Accessory");

exports.create = (accessoryData) => Accesory.create(accessoryData);
exports.getAll = () => Accessory.find();
