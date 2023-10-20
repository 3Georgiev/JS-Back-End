const path = require("path");
const express = require("express");
const cookieParse = require("cookie-parser");
const { auth } = require("../middlewares/authMiddleware");

const expressConfig = (app) => {
  const staticFiles = express.static(path.resolve(__dirname, "../static"));
  app.use(staticFiles);
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParse());
  app.use(auth);
};

module.exports = expressConfig;
