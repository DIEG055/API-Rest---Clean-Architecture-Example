module.exports = function makeUserDB({ makeDB }) {
  const getAll = async () => {
    const db = await makeDB();
    const result = await db.collection("users");
    return result;
  };
  const getById = async ({ userId }) => {
    const db = await makeDB();
    const result = await db.collection("users").find({ _id: userId });
    return result;
  };
  const getByHash = async ({ username, email }) => {
    const db = await makeDB();
    const result = await db.collection("users").find({
      $or: [
        {
          email: email,
        },
        {
          username: username,
        },
      ],
    });
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { ...insertedInfo } = found[0];
    return { email: insertedInfo.email, username: insertedInfo.username };
  };
  const create = async (userInfo) => {
    const db = await makeDB();
    const result = await db.collection("users").insertOne(userInfo);
    const { _id: id, ...insertedInfo } = result.ops[0];
    delete insertedInfo.password;
    return { id, ...insertedInfo };
  };
  const update = async ({ userInfo }) => {
    const db = await makeDB();
    const result = await db.collection("users").updateOne({ userInfo });
    return result;
  };
  const remove = async ({ id }) => {
    const db = await makeDB();
    const result = await db.collection("users").deleteOne({ _id: id });
    return result;
  };
  return Object.freeze({
    getAll,
    getById,
    getByHash,
    create,
    update,
    remove,
  });
};
