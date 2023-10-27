const mongoose = require("mongoose");
const URL = "mongodb://127.0.0.1:27017/second-hand-electornics";

async function dbConnect() {
  await mongoose.connect(URL);
}

module.exports = dbConnect;
