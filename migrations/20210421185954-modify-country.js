"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Countries", "cost_of_living_index", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn("Countries", "rent_index", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn("Countries", "restaurant_price_index", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn("Countries", "groceries_index", {
      type: Sequelize.FLOAT,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Countries", "cost_of_living_index");
    await queryInterface.removeColumn("Countries", "rent_index");
    await queryInterface.removeColumn("Countries", "restaurant_price_index");
    await queryInterface.removeColumn("Countries", "groceries_index");
  },
};
