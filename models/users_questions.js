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
      this.belongsToMany(models.User, { through: "Users_Questions" });
    }
  }
  Users_Questions.init(
    {
      userId: DataTypes.INTEGER,
      usersQuestionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UsersQuestions",
      tableName: "Users_Questions",
      underscored: true,
    }
  );
  return Users_Questions;
};
