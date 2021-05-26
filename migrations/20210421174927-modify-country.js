"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Countries", "phones_per_1000", {
      type: Sequelize.FLOAT,
    });

    await queryInterface.renameColumn("Countries", "GDP", "gdp");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Countries", "phones_per_1000");
    await queryInterface.renameColumn("Countries", "gdp", "GDP");
  },
};
