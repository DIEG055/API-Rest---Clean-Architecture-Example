module.exports = function makeGetUserById({ findUserById }) {
  return async function getUserById(httpRequest) {
    try {
      const { id } = httpRequest.params || {};
      const user = await findUserById(id);
      return {
        headers: {
          "Content-Type": "application/json",
          "Last-Modified": new Date(user.modifiedOn).toUTCString(),
        },
        statusCode: 201,
        body: {
          ok: true,
          status: 201,
          user,
        },
      };
    } catch (e) {
      if (e.name === "RangeError") {
        return {
          headers: {
            "Content-Type": "application/json",
          },
          statusCode: 404,
          body: {
            error: e.message,
          },
        };
      }
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
