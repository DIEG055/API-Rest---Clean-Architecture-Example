const usersDB = require("../repositories/index");
const makeAddUser = require("./addUser");
const makeFindUsers = require("./findUsers");
const makeFindUserById = require("./findUser");
const makeUpdateUserById = require("./updateUser");
const makeRemoveUserById = require("./removeUser");

const addUser = makeAddUser({ usersDB });
const findUsers = makeFindUsers({ usersDB });
const findUserById = makeFindUserById({ usersDB });
const updateUserById = makeUpdateUserById({ usersDB });
const removeUserById = makeRemoveUserById({ usersDB });

module.exports = {
  addUser,
  findUsers,
  findUserById,
  updateUserById,
  removeUserById,
};
