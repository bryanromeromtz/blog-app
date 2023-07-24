const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 4003 || process.env.PORT;

const events = "./events.json";

app.use(bodyParser.json());
app.use(cors());

app.get("/posts", async (req, res) => {
  fs.readFile(events, (err, info) => {
    if (err) {
      console.error("Error al leer los eventos:", err);
      res.status(500).send("Error al leer los eventos");
      return;
    }

    const eventsData = JSON.parse(info.toString());
    const posts = Object.values(eventsData).map((post) => {
      return { id: post.id, title: post.title, comments: post?.comments };
    });

    res.status(200).send(posts);
  });
});

app.post("/events", async (req, res) => {
  fs.readFile(events, (err, info) => {
    if (err) {
      console.error("Error al leer los eventos:", err);
      res.status(500).send("Error al leer los eventos");
      return;
    }

    const { type, data } = req.body;
    const eventsData = JSON.parse(info.toString());
    console.log("Eventos actuales:", eventsData);

    if (type === "PostCreated") {
      const { id, title } = data;
      eventsData[id] = { id, title, comments: [] };
    }

    if (type === "CommentCreated") {
      const { id, content, postId } = data;
      const post = eventsData[postId];
      if (post) {
        post.comments.push({ id, content });
      } else {
        console.error("El post con el id", postId, "no existe");
      }
    }

    fs.writeFile(events, JSON.stringify(eventsData), (err) => {
      if (err) {
        console.error("Error al guardar el evento:", err);
        res.status(500).send("Error al guardar el evento");
        return;
      }
      console.log("Eventos actualizados guardados con éxito");
      res.status(200).send({ status: "OK", event: req.body });
    });
  });
});

app.listen(port, () =>
  console.log(`Query Service listening on port ${port} 🔥🚀🔥!`)
);
