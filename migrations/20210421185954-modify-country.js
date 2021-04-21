"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("countries", "cost_of_living_index", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn("countries", "rent_index", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn("countries", "restaurant_price_index", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn("countries", "groceries_index", {
      type: Sequelize.FLOAT,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("countries", "cost_of_living_index");
    await queryInterface.removeColumn("countries", "rent_index");
    await queryInterface.removeColumn("countries", "restaurant_price_index");
    await queryInterface.removeColumn("countries", "groceries_index");
  },
};
