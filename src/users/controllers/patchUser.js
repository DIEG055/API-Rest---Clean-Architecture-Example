module.exports = function makePatchUserById({ updateUserById }) {
  return async function patchUserById(httpRequest) {
    try {
      const { id } = httpRequest.params || {};
      const { ...newUserInfo } = httpRequest.body;
      const user = await updateUserById(id, newUserInfo);
      if (user === null) {
        throw new Error(
          "Data is already up to date. Please provide new values"
        );
      }
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        body: {
          ok: true,
          status: 201,
          message: "User updated successfully",
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
