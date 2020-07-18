const express = require("express");
const app = express();
const { expressCallback } = require("../../utils/index");
const {
  createUser,
  getUsers,
  getUserById,
  patchUserById,
  deleteUserById,
} = require("../controllers/index");

app.get("/users/:id", expressCallback(getUserById));
app.get("/users", expressCallback(getUsers));
app.post("/users", expressCallback(createUser));
app.patch("/users/:id", expressCallback(patchUserById));
app.delete("/users/:id", expressCallback(deleteUserById));

module.exports = app;
