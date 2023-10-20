const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");

exports.register = (userData) => User.create(userData);

exports.login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password!");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Invalid email or password!");
  }

  const payload = {
    _id: user._id,
    email: user.email,
  };
  const token = await jwt.sign(payload, "Secret", { expiresIn: "3d" });

  return token;
};
