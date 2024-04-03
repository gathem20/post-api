const bodyParser = require("body-parser");
const express = require("express");
const imagekit = require("imagekit");
const mongoos = require("mongoose");
const database = require("./config");
const comprssion = require("compression");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const app = express();
app.use(comprssion());
app.use(cors());

app.use(bodyParser.json());
// const image_kit = new imagekit({
//   publicKey: "",
//   privateKey: "",
//   urlEndpoint:
//     "https://ik.imagekit.io/higif0c3k/default-image.jpg?updatedAt=1712012215713",
// });
//start POST API
app.post("/post", async (req, res) => {
  try {
    const { name, description, image } = req.body;
    // const uploadimage = await image_kit.upload({
    //   file: image,
    //   fileName: "",
    // });

    const data = await database.insertOne({
      name,
      description,
      image,
    });
    console.log(data);
    res.json({ name, description, image });
  } catch (err) {
    console.log("something wrong!", err);
  }
});
//Ending post api

//start patch api

app.patch("/patch/:id", async (req, res) => {
  try {
    const isValidObjectId = mongoose.isValidObjectId(req.params.id);
    if (!isValidObjectId) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const postId = mongoose.Types.ObjectId(req.params.id);
    const updates = req.body;
    const updatedPost = await database.findOneAndUpdate(
      { _id: postId },
      { $set: updates },
      { new: true }
    );
    if (!updatedPost)
      return res.status(404).json({ message: "Failed to update the post" });
    res.json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update the post" });
  }
});
//ending patch api
const port = 3000;
app.listen(port, (req, res) => {
  console.log(`server connect on port:${port}`);
});
