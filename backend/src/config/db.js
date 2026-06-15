const mongoose = require("mongoose");
const { MONGO_URI } = require("./env");

const connectDB = async () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => { console.log("connected successfully"); })
    .catch(() => { console.log("error connecting to mongodb"); });
};

module.exports = connectDB;