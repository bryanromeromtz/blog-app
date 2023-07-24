const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const port = 4004;
const app = express();

app.use(bodyParser.json());

app.post("/events", (req, res) => {});

app.listen(port, () => {
  console.log(`Moderation Service listening on port ${port} 🔥🚀🔥!`);
});
