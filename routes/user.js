const { Router } = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");
const {
  createUser,
  getScoreboard,
  updateScore,
  register,
  login,
  logout,
} = require("../utils");
const { validateToken } = require("./middlewares/validateToken");

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

// user.post("/new", async (req, res) => {
//   try {
//     const { userName } = req.query;
//     const userCreated = await createUser(userName);
//     res.json({ ...userCreated, loading: false, error: "" });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

user.put("/update-score", async (req, res) => {
  try {
    const { id, score } = req.query;
    const updatedScore = await updateScore(Number(id), Number(score));
    res.json({ ...updatedScore, loading: false, error: "" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

user.post("/login", validateToken, (req, res) => {
  login();
  res.status(200).send(req.user);
});

user.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await register({ name, email, password });
    res.json({ ...user, loading: false, error: "" });
  } catch (err) {
    if (err.message === "This email already exists")
      return res.status(403).send(err.message);

    return res.status(500).send(err.message);
  }
});

user.post("/logout", (req, res) => {
  logout();
  res.status(204).send("User Logged Out Successfully");
});

module.exports = user;
