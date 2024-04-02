const bodyParser = require("body-parser");
const express = require("express");
const imagekit = require("imagekit");
const database = require("./config");
const app = express();
app.use(bodyParser.json());
app.post("/post", async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const data = await database.insertMany({ name, description, image });
    console.log(data);
    res.json({ name, description, image });
  } catch (err) {
    throw new Error("error post");
  }
});
app.patch("/patch", (req, res) => {
  try {
  } catch (err) {
    throw new Error("error patch");
  }
});
const port = 3000;
app.listen(port, (req, res) => {
  console.log(`server connect on port:${port}`);
});
