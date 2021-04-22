const { Country, Question } = require("./models");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

const randomQuestion = () => {
  return Question.findOne({
    order: Sequelize.literal("rand()"),
    limit: 1,
    attributes: { exclude: ["id", "createdAt", "updatedAt"] },
  });
};

const get2RandomCountries = (column) => {
  const list = Country.findAll({
    order: Sequelize.literal("rand()"),
    limit: 2,
    attributes: ["id", column, "country"],
    where: { [Op.not]: { [column]: null } },
  });
  return list;
};

const get3RandomAnswers = (column, id) => {
  const list = Country.findAll({
    order: Sequelize.literal("rand()"),
    limit: 3,
    attributes: [column, "country"],
    where: {
      [Op.and]: [{ id: { [Op.ne]: id } }, { [Op.not]: { [column]: null } }],
    },
  });
  return list;
};

// generators of the different types of questions
const questionType1 = async (columns, question) => {
  const countries = await get2RandomCountries(columns);
  const country = countries[0].toJSON();
  const fakeAnswers = (
    await get3RandomAnswers(columns, country.id)
  ).map((answer) => answer.toJSON());
  const options = [
    ...fakeAnswers.map((answer) => answer.country),
    country.country,
  ];
  return {
    question,
    options,
    answer: country.country,
  };
};

const questionType2 = async (columns, template) => {
  const countries = await get2RandomCountries(columns);
  const country = countries[0].toJSON();
  const question = template.replace("X", country.country);
  const fakeAnswers = (
    await get3RandomAnswers(columns, country.id)
  ).map((answer) => answer.toJSON());
  const options = [
    ...fakeAnswers.map((answer) => answer[columns]),
    country[columns],
  ];
  return {
    question: question,
    options: options,
    answer: country[columns],
  };
};
const questionType3 = async (columns, template) => {
  const countries = await get2RandomCountries(columns);
  const country1 = countries[0].toJSON();
  const country2 = countries[1].toJSON();
  let question = template.replace("Y", country2.country);
  question = question.replace("X", country1.country);
  const answer = country1.columns > country2.columns;
  return {
    question,
    options: [true, false],
    answer: answer,
  };
};

const generateQuestion = async () => {
  const data = await randomQuestion();
  const question = data.toJSON();
  const { columns, type, template } = question;

  switch (type) {
    case 1:
      return await questionType1(columns, template);
    case 2:
      return await questionType2(columns, template);
    case 3:
      return await questionType3(columns, template);
  }
};

module.exports = { generateQuestion };
