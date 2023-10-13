const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");

exports.register = (userData) => {
  return User.create(userData);
};

exports.login = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("Invalid username or passowrd!");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Invalid username or passowrd!");
  }

  const payload = {
    _id: user._id,
    username: user.username,
  };
  const token = await jwt.sign(payload, "CoolSecret", { expiresIn: "3d" });
  return token;
};
