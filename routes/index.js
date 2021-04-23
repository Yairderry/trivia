const { Router } = require("express");
const user = require("./user");
const question = require("./question");

const api = Router();

api.use("/user", user);
api.use("/question", question);

module.exports = api;
