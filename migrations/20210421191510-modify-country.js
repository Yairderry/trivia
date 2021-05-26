"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Countries", "quality_of_life_index", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn("Countries", "health_care_index", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn("Countries", "pollution_index", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn("Countries", "traffic_commute_time_index", {
      type: Sequelize.FLOAT,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Countries", "quality_of_life_index");
    await queryInterface.removeColumn("Countries", "health_care_index");
    await queryInterface.removeColumn("Countries", "pollution_index");
    await queryInterface.removeColumn(
      "Countries",
      "traffic_commute_time_index"
    );
  },
};
