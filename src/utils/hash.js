const crypto = require("crypto");

const md5Hash = (text) =>
  crypto.createHash("md5").update(text, "utf-8").digest("hex");

module.exports = {
  md5Hash,
};
