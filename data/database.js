const mongoose = require("mongoose");

let database;

async function initDb() {
  database = await mongoose.connect(
    "mongodb://localhost:27017/parcelsdb",
    {
      useNewUrlParser: true,
    }
  );
}

function getDb() {
  if (!database) {
    throw new Error("Database not connected");
  }
  return database;
}

module.exports = {
  initDb: initDb,
  getDb: getDb,
};
