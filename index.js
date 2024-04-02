const bodyParser = require("body-parser");
const express = require("express");
const imagekit = require("imagekit");
const database = require("./config");
const app = express();
app.use(bodyParser.json());
try {
  app.post("/post", async (req, res) => {
    const { name, description, image } = req.body;
    const data = await database.insertMany({ name, description, image });
    console.log(data);
    res.json({ name, description, image });
  });
} catch (err) {
  throw new Error("error");
}

try {
  
} catch (error) {
  console.log(error)
}





const port = 3000;
app.listen(port, (req, res) => {
  console.log(`server connect on port:${port}`);
});
