const express = require("express");
const app = express();
const { expressCallback } = require("../../utils/index");
const { createUser } = require("../controllers/index");

app.get("/user/:id", expressCallback());
app.get("/users", expressCallback());
app.post("/users", expressCallback(createUser));
app.put("/users", expressCallback());
app.delete("/users", expressCallback());

module.exports = app;
