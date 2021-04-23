const { Router } = require("express");

const question = Router();

question.get("/new", async (req, res) => {});

question.get("/check-answer", async (req, res) => {});

question.post("/save", async (req, res) => {});

question.put("/rate", async (req, res) => {});

module.exports = question;
