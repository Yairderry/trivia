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
    const { userId } = req.query;

    if (!Number(userId)) throw Error("You need to enter user id!");

    const question = await getQuestion(Number(userId));
    res.json({ ...question, loading: false, error: "" });
  } catch (error) {
    if (error.message === "You need to enter user id!")
      return res.status(400).send(error.message);

    if (error.message === "User not found")
      return res.status(404).send(error.message);

    res.status(500).send(error.message);
  }
});

question.post("/check-answer", async (req, res) => {
  try {
    const { answer, questionId, userId } = req.query;
    const { countriesId, columns, desc, type } = req.body;
    const isCorrect = await checkAnswer(
      Number(userId),
      Number(answer) ? Number(answer) : answer,
      Number(questionId),
      countriesId,
      columns,
      desc,
      type
    );
    res.json({ ...isCorrect, loading: false, error: "" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

question.post("/save", async (req, res) => {
  try {
    const { rating } = req.query;
    console.log(req.body);
    const savedQuestion = await saveQuestion(req.body, Number(rating));
    res.json({ ...savedQuestion, loading: false, error: "" });
  } catch (error) {
    console.log(error);
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
