const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const port = 4004;
const app = express();

app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommnetCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    let event = {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    };
    await axios.post("http://localhost:4002/events", {
      event,
    });

    res.status(200).send({ status: "OK", event });
  }
});

app.listen(port, () => {
  console.log(`Moderation Service listening on port ${port} 🔥🚀🔥!`);
});
