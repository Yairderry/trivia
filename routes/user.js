const { Router } = require("express");
const express = require("express");
const { createUser, getScoreboard, updateScore } = require("../utils");

const user = Router();

user.use(express.json());

user.get("/scoreboard", async (req, res) => {
  try {
    const scoreBoard = await getScoreboard();
    res.json({ success: true, message: "Got scoreBoard", data: scoreBoard });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There was an issue in our server...",
      data: error,
    });
  }
});

user.post("/new", async (req, res) => {
  try {
    const { userName } = req.query;
    const userCreated = await createUser(userName);
    res.json({ success: true, message: "User created", data: userCreated });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There was an issue in our server...",
      data: error,
    });
  }
});

user.put("/update-score", async (req, res) => {
  try {
    const { id, score } = req.query;
    const updatedScore = await updateScore(Number(id), Number(score));
    console.log(updatedScore);
    res.json({ success: true, message: "Score updated", data: updatedScore });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There was an issue in our server...",
      data: error,
    });
  }
});

module.exports = user;
