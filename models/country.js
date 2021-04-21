"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Country.init(
    {
      country: DataTypes.STRING,
      capital: DataTypes.STRING,
      continent: DataTypes.STRING,
      region: DataTypes.STRING,
      GDP: DataTypes.INTEGER,
      literacy: DataTypes.FLOAT,
      population: DataTypes.INTEGER,
      densityPop: DataTypes.INTEGER,
      area: DataTypes.INTEGER,
      age0To14Years: DataTypes.FLOAT,
      age15To64Years: DataTypes.FLOAT,
      ageAbove65Years: DataTypes.FLOAT,
      crimeIndex: DataTypes.FLOAT,
      safetyIndex: DataTypes.FLOAT,
      phonesPer1000: DataTypes.FLOAT,
      costOfLivingIndex: DataTypes.FLOAT,
      rentIndex: DataTypes.FLOAT,
      restaurantPriceIndex: DataTypes.FLOAT,
      groceriesIndex: DataTypes.FLOAT,
      qualityOfLifeIndex: DataTypes.FLOAT,
      healthcareIndex: DataTypes.FLOAT,
      pollutionIndex: DataTypes.FLOAT,
      trafficCommuteTimeIndex: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Country",
      underscored: true,
    }
  );
  return Country;
};
