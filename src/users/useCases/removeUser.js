module.exports = function makeRemoveUserById({ usersDB }) {
  return async function removeUserById(id) {
    if (!id) {
      throw new Error("You must supply an id.");
    }
    return usersDB.remove(id);
  };
};
