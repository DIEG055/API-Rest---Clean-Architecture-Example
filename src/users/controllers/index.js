const makeCreateUser = require("./createUser");
const { addUser } = require("../userCases/index");

const createUser = makeCreateUser({ addUser });

module.exports = { createUser };
