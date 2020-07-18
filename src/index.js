const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();

// middlewares
app.use(bodyParser.json());
//routes
app.use(require("./users/routes/index"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`running on port ${port}`));
