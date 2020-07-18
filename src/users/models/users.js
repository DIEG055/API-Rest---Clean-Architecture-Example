module.exports = function buildMakeUser({
  encrypt,
  md5Hash,
  capitalize,
  isValidEmail,
}) {
  return function makeUser({
    name,
    lastname,
    username,
    password,
    email,
    description,
    createdOn = Date.now(),
    modifiedOn = Date.now(),
  } = {}) {
    if (!name) {
      throw new Error("User must contain a name");
    }
    if (!lastname) {
      throw new Error("User must contain a lastname");
    }
    if (!username) {
      throw new Error("User must contain a username");
    }
    if (!email || !isValidEmail(email)) {
      throw new Error("User must contain a valid email");
    }
    if (!password || password.length < 6) {
      throw new Error(
        "User must container a password with at lest 6 characters"
      );
    }
    encryptedPassword = encrypt(password);

    if (!description) {
      throw new Error("User must container a name");
    }
    let hash;

    return Object.freeze({
      getHash: () => hash || (hash = makeHash()),
      getName: () => capitalize(name),
      getLastname: () => capitalize(lastname),
      getUsername: () => username,
      getPassword: () => encryptedPassword,
      getEmail: () => email,
      getDescription: () => description,
      getCreatedOn: () => createdOn,
      getModifiedOn: () => modifiedOn,
    });
    function makeHash() {
      return md5Hash(username + email);
    }
  };
};
