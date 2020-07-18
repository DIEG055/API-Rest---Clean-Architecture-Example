const makeUser = require("../models/index");

module.exports = function makeAddUser({ usersDB }) {
  return async function addUser(userInfo) {
    const user = makeUser(userInfo);
    const alreadyCreated = await usersDB.getByHash({
      email: user.getEmail(),
      username: user.getUsername(),
    });
    if (alreadyCreated) {
      if (alreadyCreated.username === user.getUsername()) {
        throw new Error("username already taken");
      }
      throw new Error("user already exist");
    }

    return usersDB.create({
      name: user.getName(),
      lastname: user.getLastname(),
      username: user.getUsername(),
      password: user.getPassword(),
      hash: user.getHash(),
      email: user.getEmail(),
      description: user.getDescription(),
      createdOn: user.getCreatedOn(),
      modifiedOn: user.getModifiedOn(),
    });
  };
};
