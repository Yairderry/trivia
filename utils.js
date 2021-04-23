const {
  UsersQuestions,
  User,
  SavedQuestion,
  Country,
  Question,
} = require("./models");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

const getQuestion = async (name) => {
  const chance = await calculateSavedQuestionChance(name);
  const question =
    chance === 0
      ? await generateQuestion()
      : chance >= Math.floor(Math.random() * 100 + 1)
      ? await getSavedQuestion(name)
      : await generateQuestion();
  return question;
};

const saveQuestion = async (
  userId,
  { question, option_1, option_2, option_3, option_4, answer, isCorrect },
  rating
) => {
  const savedQuestion = await SavedQuestion.create({
    question,
    option_1,
    option_2,
    option_3,
    option_4,
    answer,
    rating: 0,
    voteCount: 0,
    answeredCorrect: isCorrect ? 1 : 0,
    answeredWrong: !isCorrect ? 1 : 0,
  });
  const { id } = savedQuestion.toJSON();
  const rated = await rateQuestion(id, rating);
  const added = await UsersQuestions.create({ userId, savedQuestionId: id });
  return added;
};

const rateQuestion = async (id, rating) => {
  if (!/[1-5]/.test(rating)) throw new Error("No hacking!");

  const savedQuestion = await SavedQuestion.update(
    {
      rating: Sequelize.literal(
        `(rating * vote_count + ${rating} )/ (vote_count + 1)`
      ),
      voteCount: Sequelize.literal("vote_count + 1"),
    },
    { where: { id } }
  );
  return savedQuestion;
};

const createUser = async (name) => {
  const user = await User.create({ name, score: 0, strikes: 0 });
  const userData = user.toJSON();
  delete userData.createdAt;
  delete userData.updatedAt;
  return userData;
};

const updateScore = async (id, score) => {
  score === 0
    ? await User.increment("strikes", {
        by: 1,
        where: { id },
      })
    : await User.increment("score", {
        by: score,
        where: { id },
      });

  const updatedUser = await User.findOne({
    where: { id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  return updatedUser.toJSON();
};

const getScoreboard = async () => {
  const users = await User.findAll({
    order: [["score", "DESC"]],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  return users.map((user) => user.toJSON());
};

const checkAnswer = async (
  answer,
  questionId,
  countries,
  columns,
  desc,
  type
) => {
  if (questionId) return await checkAnswerType4(answer, questionId);

  switch (type) {
    case 1:
      return await checkAnswerType1(answer, countries, columns, desc);
    case 2:
      return await checkAnswerType2(answer, countries, columns);
    case 3:
      return await checkAnswerType3(answer, countries, columns, desc);
  }
};

const endGameFor = async (userId) => {
  const endGame = await UsersQuestions.destroy({ where: { userId } });
  return endGame;
};

/* checking users answer start*/
const checkAnswerType1 = async (answer, countries, columns, desc) => {
  const expectedAnswer = await Country.findOne({
    where: { [Op.or]: countries.map((id) => ({ id })) },
    order: [[columns, desc ? "ASC" : "DESC"]],
    limit: 1,
    attributes: ["country", columns],
  }).then((data) => data.toJSON());
  return {
    correctAnswer: correctAnswer.answer,
    UserAnswer: answer,
  };
};

const checkAnswerType2 = async (answer, countries, columns) => {
  const expectedAnswer = await Country.findOne({
    where: { id: countries[0] },
    attributes: [columns],
  }).then((data) => data.toJSON());
  return {
    correctAnswer: expectedAnswer[columns],
    UserAnswer: answer,
  };
};

const checkAnswerType3 = async (answer, countries, columns, desc) => {
  const expectedAnswer = await Country.findAll({
    where: { [Op.or]: [countries.map((id) => ({ id }))] },
    order: [[columns, desc ? "DESC" : "ASC"]],
    attributes: [columns],
  }).then((data) => data.map((ans) => ans.toJSON()[columns]));

  return {
    correctAnswer: expectedAnswer[0] > expectedAnswer[1],
    UserAnswer: answer,
  };
};

// when answering a saved question
const checkAnswerType4 = async (answer, questionId) => {
  const expectedAnswer = await SavedQuestion.findOne({
    where: { id: questionId },
    attributes: ["answer"],
  }).then((data) => data.toJSON());
  const correctAnswer =
    expectedAnswer === "false"
      ? false
      : expectedAnswer === "true"
      ? true
      : expectedAnswer;
  return {
    correctAnswer: correctAnswer.answer,
    UserAnswer: answer,
  };
};
/* checking users answer end*/

/* get question start*/
const getSavedQuestion = async (name) => {
  const questionsAsked = await User.findOne({
    where: { name },
    include: {
      model: SavedQuestion,
    },
  });

  const questions = await SavedQuestion.findAll({
    where: {
      id: {
        [Op.notIn]: questionsAsked.toJSON().SavedQuestions.map((q) => q.id),
      },
    },
    attributes: [
      "id",
      "question",
      "option_1",
      "option_2",
      "option_3",
      "option_4",
      "rating",
    ],
  });

  // create duplicates of each question data based on the rating
  const questionsWithDuplicates = questions.flatMap((q) => {
    const question = q.toJSON();
    const arr = [];
    for (var i = 0; i < Math.floor(question.rating); i++) arr.push(question);
    return arr;
  });

  const pickedQuestion =
    questionsWithDuplicates[
      Math.floor(Math.random() * questionsWithDuplicates.length)
    ];
  const { option_1, option_2, option_3, option_4 } = pickedQuestion;
  pickedQuestion.options = [option_1, option_2, option_3, option_4];
  delete pickedQuestion.rating,
    delete pickedQuestion.option_1,
    delete pickedQuestion.option_2,
    delete pickedQuestion.option_3,
    delete pickedQuestion.option_4;
  return pickedQuestion;
};

/* generating new question start*/
const generateQuestion = async () => {
  try {
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
  } catch (err) {
    console.log("-------------generating question-------------");
    console.log(err);
  }
};

const questionType1 = async (columns, question, desc) => {
  const countries = await get2RandomCountries(columns);
  const country = countries[0].toJSON();
  const fakeAnswers = (
    await get3RandomAnswers(columns, country.id, country[columns])
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
    await get3RandomAnswers(columns, country.id, country[columns])
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
  return {
    countriesId: [country1.id, country2.id],
    columns,
    desc,
    question,
    options: [true, false],
  };
};

const calculateSavedQuestionChance = async (name) => {
  const questionsAsked = await User.findOne({
    where: { name },
    include: {
      model: SavedQuestion,
    },
  });

  const questions = await SavedQuestion.findAndCountAll({
    where: {
      id: {
        [Op.notIn]: questionsAsked.toJSON().SavedQuestions.map((q) => q.id),
      },
    },
  });

  const chance =
    questions.count === 0
      ? 0
      : questions.count > 0 && questions.count <= 100
      ? 10 + 6 * questions.count
      : 70;

  return chance;
};
/* generating new question end*/
/* get question end*/

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

module.exports = {
  getQuestion,
  getScoreboard,
  saveQuestion,
  rateQuestion,
  createUser,
  updateScore,
  checkAnswer,
  endGameFor,
};
