const mongodb = require("mongodb");
const makeUserDB = require("./userMongoDB");

const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID;
const url = "mongodb://localhost:27017/books_review";
const dbName = "books_review";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function makeDB() {
  if (!client.isConnected()) {
    await client.connect();
  }
  const db = client.db(dbName);
  return db;
}

const usersDB = makeUserDB({ makeDB, ObjectId });

module.exports = usersDB;
