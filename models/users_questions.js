"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users_Questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users_Questions.init(
    {
      userId: DataTypes.INTEGER,
      SavedQuestionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UsersQuestions",
      underscored: true,
    }
  );
  return Users_Questions;
};
