const usersDB = require("../dataAccess/index");
const makeAddUser = require("./addUser");

const addUser = makeAddUser({ usersDB });

module.exports = { addUser };
