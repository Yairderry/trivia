"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("countries", "phones_per_1000", {
      type: Sequelize.FLOAT,
    });

    await queryInterface.renameColumn("countries", "GDP", "gdp");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("countries", "phones_per_1000");
    await queryInterface.renameColumn("countries", "gdp", "GDP");
  },
};
