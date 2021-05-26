"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.UsersQuestions, { through: "Users_Questions" });
    }
  }
  user.init(
    {
      score: DataTypes.INTEGER,
      topScore: DataTypes.INTEGER,
      name: DataTypes.STRING,
      strikes: DataTypes.INTEGER,
      playing: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.getDataValue("strikes") < 3;
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      underscored: true,
    }
  );
  return user;
};
