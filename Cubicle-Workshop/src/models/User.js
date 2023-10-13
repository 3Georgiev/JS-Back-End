const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

userSchema.virtual("repeatPassword").set(function (value) {
  if (value !== this.password) {
    console.log("Password missmatch");
    // throw new mongoose.MongooseError("Passowrd missmatch");
  }
});
const User = mongoose.model("User", userSchema);

module.exports = User;
