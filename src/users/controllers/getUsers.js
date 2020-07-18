module.exports = function makeGetUsers({ findUsers }) {
  return async function getUsers(httpRequest) {
    try {
      const users = await findUsers();
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        body: {
          ok: true,
          status: 201,
          users,
        },
      };
    } catch (e) {
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 502,
        body: {
          ok: false,
          error: e.message,
        },
      };
    }
  };
};
