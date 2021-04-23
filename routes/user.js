const { Router } = require("express");
const express = require("express");

const user = Router();

user.use(express.json());

user.get("/score-board", async (req, res) => {});

user.post("/new", async (req, res) => {});

user.put("/update-score", async (req, res) => {});

module.exports = user;
