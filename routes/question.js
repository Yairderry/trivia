const { Router } = require("express");
const { getQuestion } = require("../utils");

const question = Router();

question.get("/new", async (req, res) => {
  // const question= await getQuestion();
});

question.get("/check-answer", async (req, res) => {});

question.post("/save", async (req, res) => {});

question.put("/rate", async (req, res) => {});

module.exports = question;
