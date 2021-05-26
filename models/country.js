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
      gdp: DataTypes.INTEGER,
      literacy: DataTypes.FLOAT,
      population: DataTypes.INTEGER,
      densityPop: DataTypes.INTEGER,
      area: DataTypes.INTEGER,
      age_0To_14Years: DataTypes.FLOAT,
      age_15To_64Years: DataTypes.FLOAT,
      ageAbove_65Years: DataTypes.FLOAT,
      crimeIndex: DataTypes.FLOAT,
      safetyIndex: DataTypes.FLOAT,
      phonesPer_1000: DataTypes.FLOAT,
      costOfLivingIndex: DataTypes.FLOAT,
      rentIndex: DataTypes.FLOAT,
      restaurantPriceIndex: DataTypes.FLOAT,
      groceriesIndex: DataTypes.FLOAT,
      qualityOfLifeIndex: DataTypes.FLOAT,
      healthCareIndex: DataTypes.FLOAT,
      pollutionIndex: DataTypes.FLOAT,
      trafficCommuteTimeIndex: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Country",
      tableName: "Countries",
      underscored: true,
    }
  );
  return Country;
};
