const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});
const User = mongoose.model("User", userSchema);

module.exports = User;
