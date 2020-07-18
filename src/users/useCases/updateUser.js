const makeUser = require("../models/index");

module.exports = function makeUpdateUser({ usersDB }) {
  return async function updateUser(id, userInfo) {
    if (!id) {
      throw new Error("You must supply an id.");
    }
    if (!userInfo) {
      throw new Error("You must data.");
    }
    // TODO validate data
    const existing = await usersDB.findById(id);
    if (!existing) {
      throw new RangeError("User not found.");
    }

    return usersDB.update(id, userInfo);
  };
};
