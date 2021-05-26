"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(
      "Users_Questions",
      "question_id",
      "saved_question_id"
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(
      "Users_Questions",
      "saved_question_id",
      "question_id"
    );
  },
};
