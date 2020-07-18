const bcrypt = require("bcrypt");
const buildMakeUser = require("./users");
const { capitalize, isValidEmail, md5Hash } = require("../../utils/index");

const encrypt = (password) => bcrypt.hashSync(password, 10);

const makeUser = buildMakeUser({ encrypt, md5Hash, capitalize, isValidEmail });

module.exports = makeUser;
