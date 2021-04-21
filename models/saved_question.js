"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Saved_question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Saved_question.init(
    {
      question: DataTypes.STRING,
      option1: DataTypes.STRING,
      option2: DataTypes.STRING,
      option3: DataTypes.STRING,
      option4: DataTypes.STRING,
      answer: DataTypes.STRING,
      rating: DataTypes.FLOAT,
      voteCount: DataTypes.INTEGER,
      answeredCorrect: DataTypes.INTEGER,
      answeredWrong: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SavedQuestion",
      underscored: true,
    }
  );
  return Saved_question;
};
