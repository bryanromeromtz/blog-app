const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 4002 || process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

app.post("/events", async (req, res) => {
  const event = req.body;
  await axios.post("http://localhost:3001/events", event);
  await axios.post("http://localhost:3002/events", event);
  await axios.post("http://localhost:3003/events", event);

  res.status(200).send({ status: "OK", event });
});

app.listen(port, () =>
  console.log(`Event Brooker listening on port ${port} 🔥🚀🔥!`)
);
