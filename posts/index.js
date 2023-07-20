const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const port = 3002 || process.env.PORT;
const { randomBytes } = require("crypto");
const cors = require("cors");

const postsFile = "./posts.json";

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get("/post", (req, res) => {
  fs.readFile(postsFile, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al leer los posts");
      return;
    }

    let posts = [];
    if (data.length > 0) {
      posts = JSON.parse(data);
    }

    res.status(200).send(posts);
  });
});

app.post("/post", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  const newPost = {};
  newPost.id = id;
  newPost.title = title;

  fs.readFile(postsFile, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al leer los posts");
      return;
    }

    let posts = [];
    if (data.length > 0) {
      posts = JSON.parse(data);
    }

    posts.push(newPost);

    fs.writeFile(postsFile, JSON.stringify(posts), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al guardar el post");
        return;
      }

      res.status(201).send("Post guardado correctamente");
    });
  });
});

app.post("/events", (req, res) => {
  console.log("Event received:", req.body.type);

  res.status(200).send("OK");
});

app.listen(port, () => console.log(`App listening on port ${port} 🔥🚀🔥!`));
