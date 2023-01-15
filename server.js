const app = require("./app");
require("dotenv").config();
const start = require("./db");


//Start our server and tests!
const port = process.env.PORT || 3100
start(app, port)

