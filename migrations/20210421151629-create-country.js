"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Countries", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      country: {
        type: Sequelize.STRING,
      },
      capital: {
        type: Sequelize.STRING,
      },
      continent: {
        type: Sequelize.STRING,
      },
      region: {
        type: Sequelize.STRING,
      },
      GDP: {
        type: Sequelize.INTEGER,
      },
      literacy: {
        type: Sequelize.FLOAT,
      },
      population: {
        type: Sequelize.INTEGER,
      },
      density_pop: {
        type: Sequelize.INTEGER,
      },
      area: {
        type: Sequelize.INTEGER,
      },
      age_0_to_14_years: {
        type: Sequelize.FLOAT,
      },
      age_15_to_64_years: {
        type: Sequelize.FLOAT,
      },
      age_above_65_years: {
        type: Sequelize.FLOAT,
      },
      crime_index: {
        type: Sequelize.FLOAT,
      },
      safety_index: {
        type: Sequelize.FLOAT,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Countries");
  },
};
