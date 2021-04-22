const { SavedQuestion, Country, Question } = require("./models");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

const generateQuestion = async () => {
  const data = await randomQuestion();
  const question = data.toJSON();
  const { columns, type, template, desc } = question;

  switch (type) {
    case 1:
      return await questionType1(columns, template, desc);
    case 2:
      return await questionType2(columns, template);
    case 3:
      return await questionType3(columns, template, desc);
  }
};

// generators of the different types of questions
const questionType1 = async (columns, question, desc) => {
  const countries = await get2RandomCountries(columns);
  const country = countries[0].toJSON();
  const fakeAnswers = (
    await get3RandomAnswers(columns, country.id, country.columns)
  ).map((answer) => answer.toJSON());
  const options = [
    ...fakeAnswers.map((answer) => answer.country),
    country.country,
  ];
  return {
    countriesId: [...fakeAnswers.map((answer) => answer.id), country.id],
    columns,
    desc,
    question,
    options,
  };
};

const questionType2 = async (columns, template) => {
  const countries = await get2RandomCountries(columns);
  const country = countries[0].toJSON();
  const question = template.replace("X", country.country);
  const fakeAnswers = (
    await get3RandomAnswers(columns, country.id, country.columns)
  ).map((answer) => answer.toJSON());
  const options = [
    ...fakeAnswers.map((answer) => answer[columns]),
    country[columns],
  ];
  return {
    countriesId: [country.id],
    columns,
    question,
    options,
  };
};

const questionType3 = async (columns, template, desc) => {
  const countries = await get2RandomCountries(columns);
  const country1 = countries[0].toJSON();
  const country2 = countries[1].toJSON();
  let question = template.replace("Y", country2.country);
  question = question.replace("X", country1.country);
  const answer = country1.columns > country2.columns;
  return {
    countriesId: [country1.id, country2.id],
    columns,
    question,
    options: [true, false],
  };
};

const checkAnswer = async (answer, countries, columns, desc, type) => {
  switch (type) {
    case 1:
      return await checkAnswerType1(answer, countries, columns, desc);
    case 2:
      return await checkAnswerType2(answer, countries, columns);
    case 3:
      return await checkAnswerType3(answer, countries, columns, desc);
  }
};

const checkAnswerType1 = async (answer, countries, columns, desc) => {
  const expectedAnswer1 = await Country.findOne({
    where: { [Op.or]: countries.map((id) => ({ id })) },
    order: [[columns, desc ? "ASC" : "DESC"]],
    limit: 1,
    attributes: ["country", columns],
  }).then((data) => data.toJSON());
  console.log(expectedAnswer1);
  return answer === expectedAnswer1.country;
};

const checkAnswerType2 = async (answer, countries, columns) => {
  const expectedAnswer2 = await Country.findOne({
    where: { id: countries[0] },
    attributes: [columns],
  });
  const correctAnswer2 = expectedAnswer2.toJSON();
  return answer === correctAnswer2[columns];
};

const checkAnswerType3 = async (answer, countries, columns, desc) => {
  const expectedAnswer3 = await Country.findAll({
    where: { [Op.or]: [countries.map((id) => ({ id }))] },
    order: [[columns, desc ? "DESC" : "ASC"]],
    attributes: [columns],
  }).then((data) => data.map((ans) => ans.toJSON()[columns]));

  return answer === expectedAnswer3[0] > expectedAnswer3[1];
};

const saveQuestion = async ({
  question,
  option1,
  option2,
  option3,
  option4,
  answer,
  rating,
  isCorrect,
}) => {
  await SavedQuestion.create({
    question,
    option1,
    option2,
    option3,
    option4,
    answer,
    rating,
    voteCount: 1,
    answeredCorrect: isCorrect ? 1 : 0,
    answeredWrong: !isCorrect ? 1 : 0,
  });
};
// helper functions
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

const get3RandomAnswers = (column, id, option) => {
  const list = Country.findAll({
    order: Sequelize.literal("rand()"),
    limit: 3,
    attributes: ["id", column, "country"],
    where: {
      [Op.and]: [
        { id: { [Op.ne]: id } },
        { [Op.not]: { [column]: null } },
        { [Op.not]: { [column]: option } },
      ],
    },
  });
  return list;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

module.exports = { generateQuestion, checkAnswer, saveQuestion };
