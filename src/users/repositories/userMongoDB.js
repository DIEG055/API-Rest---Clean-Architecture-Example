module.exports = function makeUserDB({ makeDB, ObjectId }) {
  const findAll = async () => {
    const db = await makeDB();
    const result = await db.collection("users").find({}, { password: 0 });
    return result.toArray();
  };

  const findById = async (id) => {
    const db = await makeDB();
    const objectId = new ObjectId(id);
    const result = await db.collection("users").findOne({ _id: objectId });
    if (result) delete result.password;

    return result ? result : null;
  };

  const verifyExistentUser = async ({ username, email }) => {
    const db = await makeDB();
    const result = await db.collection("users").find({
      $or: [{ email: email }, { username: username }],
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

  const update = async (id, userInfo) => {
    const db = await makeDB();
    const objectId = new ObjectId(id);
    const result = await db
      .collection("users")
      .updateOne({ _id: objectId }, { $set: { ...userInfo } });
    return result.modifiedCount > 0 ? { id: id, ...userInfo } : null;
  };

  const remove = async (id) => {
    const db = await makeDB();
    const objectId = new ObjectId(id);
    const result = await db.collection("users").deleteOne({ _id: objectId });
    if (result.result.n === 0) {
      throw new RangeError("user not found.");
    }
    return result;
  };

  return Object.freeze({
    findAll,
    findById,
    verifyExistentUser,
    create,
    update,
    remove,
  });
};
