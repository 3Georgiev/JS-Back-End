const express = require("express");
const app = express();
const handlebarsConfig = require("./config/handlebarsConfig");
const expressConfig = require("./config/expressConfig");
const routes = require("./router");

const PORT = 3000;

//handlebars Config
handlebarsConfig(app);
//setup static files
expressConfig(app);

//routing
app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
