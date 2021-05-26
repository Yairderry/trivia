"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Saved_question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Saved_question.init(
    {
      question: DataTypes.STRING,
      option_1: DataTypes.STRING,
      option_2: DataTypes.STRING,
      option_3: DataTypes.STRING,
      option_4: DataTypes.STRING,
      answer: DataTypes.STRING,
      rating: DataTypes.FLOAT,
      voteCount: DataTypes.INTEGER,
      answeredCorrect: DataTypes.INTEGER,
      answeredWrong: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SavedQuestion",
      tableName: "Saved_Questions",
      underscored: true,
    }
  );
  return Saved_question;
};
