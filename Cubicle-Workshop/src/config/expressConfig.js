const path = require("path");
const express = require("express");

const expressConfig = (app) => {
  const staticFiles = express.static(path.resolve(__dirname, "../public"));
  app.use(staticFiles);
  app.use(express.urlencoded({ extended: false }));
};

module.exports = expressConfig;
