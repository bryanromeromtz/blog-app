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
  await axios.post("http://localhost:4000/events", event);
  await axios.post("http://localhost:4001/events", event);
  await axios.post("http://localhost:4003/events", event);
  await axios.post("http://localhost:4004/events", event);

  res.status(200).send({ status: "OK", event });
});

app.listen(port, () =>
  console.log(`Event Brooker listening on port ${port} 🔥🚀🔥!`)
);
