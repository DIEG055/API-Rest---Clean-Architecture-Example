const makeCreateUser = require("./createUser");
const makeGetUsers = require("./getUsers");
const makeGetUserById = require("./getUser");
const makePatchUserById = require("./patchUser");
const makeDeleteUserById = require("./deleteUser");

const {
  addUser,
  findUsers,
  findUserById,
  updateUserById,
  removeUserById,
} = require("../useCases/index");

const createUser = makeCreateUser({ addUser });
const getUsers = makeGetUsers({ findUsers });
const getUserById = makeGetUserById({ findUserById });
const patchUserById = makePatchUserById({ updateUserById });
const deleteUserById = makeDeleteUserById({ removeUserById });

module.exports = {
  createUser,
  getUsers,
  getUserById,
  patchUserById,
  deleteUserById,
};
