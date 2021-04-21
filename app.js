const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("client/build"));

app.use("/", (req, res) => {
  res.status(404).json({ error: "Page not found!" });
});

module.exports = app;
