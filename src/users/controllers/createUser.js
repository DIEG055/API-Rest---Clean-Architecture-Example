module.exports = function makeCreateUser({ addUser }) {
  return async function createUser(httpRequest) {
    try {
      const { ...userInfo } = httpRequest.body;
      const user = await addUser({
        ...userInfo,
      });
      return {
        headers: {
          "Content-Type": "application/json",
          "Last-Modified": new Date(user.modifiedOn).toUTCString(),
        },
        statusCode: 201,
        body: { user },
      };
    } catch (e) {
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          ok: false,
          error: e.message,
        },
      };
    }
  };
};
