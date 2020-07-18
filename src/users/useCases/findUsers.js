module.exports = function makeFindUsers({ usersDB }) {
  return async function findUsers() {
    return usersDB.findAll();
  };
};
