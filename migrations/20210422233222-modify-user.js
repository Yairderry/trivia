"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "strikes", {
      type: Sequelize.INTEGER,
      validate: {
        max: 3,
        min: 0,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "strikes");
  },
};
