"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("countries", "quality_of_life_index", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn("countries", "health_care_index", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn("countries", "pollution_index", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn("countries", "traffic_commute_time_index", {
      type: Sequelize.FLOAT,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("countries", "quality_of_life_index");
    await queryInterface.removeColumn("countries", "health_care_index");
    await queryInterface.removeColumn("countries", "pollution_index");
    await queryInterface.removeColumn(
      "countries",
      "traffic_commute_time_index"
    );
  },
};
