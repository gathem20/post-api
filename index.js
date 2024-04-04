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

const userss = [
  {
    id: 1,
    name: " yousef",
    description: "backend",
    image: 123,
  },
  {
    id: 2,
    name: " yousef gathem",
    description: "backend develpoer",
    image: 1234,
  },
];
app.get("/get", (req, res) => {
  res.json(userss);
});
app.post("/post", async (req, res) => {
  try {
    // const uploadimage = await image_kit.upload({
    //   file: image,
    //   fileName: "",
    // });
    const { name, description, image } = req.body;

    const id = userss.length + 1;
    const users = { name, description, image, id };
    const data = await database.insertMany({
      id,
      name,
      description,
      image,
    });

    userss.push(users);
    console.log(data);
    res.json({ name, description, image });
  } catch (err) {
    console.log("something wrong!", err);
  }
});
//Ending post api

//start patch api
app.patch("/patch/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, image } = req.body;
  const user = userss.find((user) => user.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  } else {
    user.id;
    user.name = name;
    user.description = description;
    user.image = image;
  }
  res.json(user);
});

//ending patch api
const port = 3000;
app.listen(port, (req, res) => {
  console.log(`server connect on port:${port}`);
});
