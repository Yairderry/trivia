"use strict";

module.exports = {
  down: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users_Questions", {
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      saved_question_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
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

  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users_Questions");
  },
};
