const mongoose = require("mongoose");
const path = require("path");
const dot_env = require("dotenv");
dot_env.config({ path: path.join(__dirname, ".env") });
const data = process.env.data;
const connect = mongoose.connect(data, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connect
  .then(() => {
    console.log("db is connected");
  })
  .catch((err) => {
    console.log("connection failed");
  });

const schemadb = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
const collection = new mongoose.model("post", schemadb);
module.exports = collection;
