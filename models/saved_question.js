'use strict';
const {
  Model
} = require('sequelize');
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
  };
  Saved_question.init({
    question: DataTypes.STRING,
    option_1: DataTypes.STRING,
    option_2: DataTypes.STRING,
    option_3: DataTypes.STRING,
    option_4: DataTypes.STRING,
    answer: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    vote_count: DataTypes.INTEGER,
    answered_correct: DataTypes.INTEGER,
    answered_wrong: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Saved_question',
    underscored: true,
  });
  return Saved_question;
};