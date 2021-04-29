const { Router } = require("express");
const express = require("express");
// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");
const {
  getScoreboard,
  updateScore,
  register,
  login,
  logout,
  newToken,
  getUser,
} = require("../utils");
const { validateToken } = require("./middlewares/validateToken");

const user = Router();

user.use(express.json());

user.get("/", validateToken, async (req, res) => {
  try {
    const { user } = req;

    const userData = await getUser(user.userId);

    res.json({ ...userData, loading: false, error: "" });
  } catch (error) {
    if (error.message === "User Not Found")
      return res.status(404).send(error.message);

    return res.status(500).send(error.message);
  }
});

user.get("/scoreboard", async (req, res) => {
  try {
    const scoreboard = (await getScoreboard()).map((user) => {
      user.strikes = undefined;
      return user;
    });

    res.json({ scoreboard, loading: false, error: "" });
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

user.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await login({ email, password });
    res.cookie("refreshToken", userData.refreshToken);
    res.json(userData);
  } catch (err) {
    if (err.message === "User or Password incorrect")
      return res.status(401).send(err.message);

    if (err.message === "User already logged in")
      return res.status(403).send(err.message);

    return res.status(500).send(err.message);
  }
});

user.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await register({ name, email, password });
    res.json({ ...user, loading: false, error: "" });
  } catch (err) {
    if (err.message === "This email already exists")
      return res.status(401).send(err.message);

    return res.status(500).send(err.message);
  }
});

user.post("/logout", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const response = await logout(refreshToken);

    if (response) return res.send("User Logged Out Successfully");

    return res.status(401).send("This had no effect");
  } catch (err) {
    if (err.message === "Refresh Token Required")
      return res.status(401).send(err.message);

    return res.status(500).send(err.message);
  }
});

user.post("/new-token", async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const accessToken = await newToken(refreshToken);

    if (accessToken instanceof Error) throw accessToken;

    res.json({ accessToken });
  } catch (err) {
    if (err.message === "Refresh Token Not Found")
      return res.status(404).send(err.message);

    return res.status(500).send(err.message);
  }
});

module.exports = user;
