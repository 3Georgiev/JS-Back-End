const handlebars = require("express-handlebars");

handlebarsConfig = (app) => {
  app.engine("hbs", handlebars.engine({ extname: "hbs" }));
  app.set("view engine", "hbs");
  app.set("views", "src/views");
};

module.exports = handlebarsConfig;
