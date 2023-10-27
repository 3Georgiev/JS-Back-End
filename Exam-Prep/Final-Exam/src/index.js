const express = require("express");
const app = express();
const dbConnect = require("./config/dbConfig");
const expressConfig = require("./config/expressConfig");
const handlebarsConfig = require("./config/handlebarsConfig");
const routes = require("./router");
const PORT = 3000;

dbConnect().then(() => console.log("Connected to DB!"));

handlebarsConfig(app);

expressConfig(app);

app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}...`));

