module.exports = function makeFindUser({ usersDB }) {
  return async function findUserById(id) {
    if (!id) {
      throw new Error("You must supply an id.");
    }
    const result = await usersDB.findById(id);
    console.log(result);
    if (result === null) throw new RangeError("User not found.");

    return result;
  };
};
