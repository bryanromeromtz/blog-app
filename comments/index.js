const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const port = 4001 || process.env.PORT;
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const commentsDB = "./commentsDB.json";

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const postEvent = async (type, data) => {
  await axios.post("http://localhost:4002/events", { type, data });
};

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
    commentsData.push({ id, content, status: "pending" });
    commentsByPostId[postId] = commentsData;

    postEvent("CommentCreated", { id, content, postId, status: "pending" });

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

app.post("/events", (req, res) => {
  console.log("Event received:", req.body.type);
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { id, postId, status, content } = data;
    fs.readFile(commentsDB, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al leer los comentarios");
        return;
      }

      const commentsByPostId = JSON.parse(data.toString());
      const comments = commentsByPostId[postId] || [];
      const comment = comments.find((comment) => comment.id === id);
      comment.status = status;

      postEvent("CommentUpdated", { id, postId, status, content });

      fs.writeFile(commentsDB, JSON.stringify(commentsByPostId), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error al guardar los comentarios");
          return;
        }

        res.status(200).send("Comentario guardado correctamente");
      });
    });
  }
});

app.listen(port, () =>
  console.log(`Comments App listening on port ${port} 🔥🚀🔥!`)
);
