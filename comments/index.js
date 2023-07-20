const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const port = 3001 || process.env.PORT;
const { randomBytes } = require("crypto");
const cors = require("cors");

const commentsDB = "./commentsDB.json";

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.post("/post/:postId/comments", (req, res) => {
  fs.readFile(commentsDB, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving comment");
      return;
    }

    const commentsByPostId = JSON.parse(data.toString());

    const id = randomBytes(4).toString("hex");
    const { content } = req.body;
    const { postId } = req.params;
    const commentsData = commentsByPostId[postId] || [];
    commentsData.push({ id, content });
    commentsByPostId[postId] = commentsData;

    fs.writeFile(commentsDB, JSON.stringify(commentsByPostId), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error saving comment");
        return;
      }

      res.status(201).send("Comentario guardado correctamente");
    });
  });
});

app.get("/post/:id/comments", (req, res) => {
  fs.readFile(commentsDB, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al leer los comentarios");
      return;
    }

    const commentsByPostId = JSON.parse(data.toString());
    const { id } = req.params;
    const comments = commentsByPostId[id] || [];

    res.status(200).send(comments);
  });
});

app.listen(port, () => console.log(`App listening on port ${port} 🔥🚀🔥!`));
