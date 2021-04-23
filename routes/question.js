const { Router } = require("express");
const {
  getQuestion,
  checkAnswer,
  saveQuestion,
  rateQuestion,
} = require("../utils");

const question = Router();

question.get("/new", async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) throw Error("You need to enter user name!");
    const question = await getQuestion(name);
    res.json({ ...question, loading: false, error: "" });
  } catch (error) {
    if (error.message === "You need to enter user name!")
      return res.status(400).send(error.message);
    res.status(500).send(error.message);
  }
});

question.post("/check-answer", async (req, res) => {
  try {
    const { answer, questionId } = req.query;
    const { countries, columns, desc, type } = req.body;
    const isCorrect = await checkAnswer(
      answer,
      Number(questionId),
      countries,
      columns,
      desc,
      type
    );
    res.json({ ...isCorrect, loading: false, error: "" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

question.post("/save", async (req, res) => {
  try {
    const { userId, rating } = req.query;
    const { question } = req.body;
    const savedQuestion = await saveQuestion(
      Number(userId),
      question,
      Number(rating)
    );
    res.json({ ...savedQuestion, loading: false, error: "" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

question.put("/rate", async (req, res) => {
  try {
    const { id, rating } = req.query;
    const questionRated = await rateQuestion(Number(id), Number(rating));
    res.json({ ...questionRated, loading: false, error: "" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = question;
