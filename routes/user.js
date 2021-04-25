const { Router } = require("express");
const express = require("express");
const { createUser, getScoreboard, updateScore } = require("../utils");

const user = Router();

user.use(express.json());

user.get("/scoreboard", async (req, res) => {
  try {
    const scoreboard = (await getScoreboard()).map((user) => {
      delete user.strikes;
      return user;
    });

    res.json({ scoreboard, loading: false, error: "" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

user.post("/new", async (req, res) => {
  try {
    const { userName } = req.query;
    const userCreated = await createUser(userName);
    res.json({ ...userCreated, loading: false, error: "" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

user.put("/update-score", async (req, res) => {
  try {
    const { id, score } = req.query;
    const updatedScore = await updateScore(Number(id), Number(score));
    res.json({ ...updatedScore, loading: false, error: "" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = user;
