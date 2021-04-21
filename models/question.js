"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Question.init(
    {
      template: DataTypes.STRING,
      columns: DataTypes.STRING,
      type: DataTypes.INTEGER,
      desc: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Question",
      underscored: true,
    }
  );
  return Question;
};
