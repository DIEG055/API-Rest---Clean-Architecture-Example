module.exports = function makeDeleteUserById({ removeUserById }) {
  return async function deleteUserById(httpRequest) {
    try {
      const { id } = httpRequest.params || {};
      const user = await removeUserById(id);
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        body: {
          ok: true,
          status: 201,
          message: "User deleted successfully",
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
