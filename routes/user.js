const { Router } = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
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
user.use(cookieParser());

user.get("/", validateToken, async (req, res) => {
  try {
    const { user } = req;

    const userData = await getUser(user.userId);

    res.json({ ...userData, loading: false, error: "" });
  } catch (error) {
    if (err.message === "User Not Found")
      return res.status(404).send(err.message);

    return res.status(500).send(error.message);
  }
});

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

user.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const tokens = await login({ email, password });
    res.cookie("accessToken", tokens.accessToken, { httpOnly: true });
    res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true });
    res.json(tokens);
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
      return res.status(403).send(err.message);

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
  const { refreshToken, user } = req.body;
  if (!refreshToken) return res.status(401).send("Refresh Token Required");
  try {
    const accessToken = await newToken(refreshToken, user);

    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.json(accessToken);
  } catch (err) {
    if (err.message === "Refresh Token Not Found")
      return res.status(404).send(err.message);

    return res.status(500).send(err.message);
  }
});

module.exports = user;
