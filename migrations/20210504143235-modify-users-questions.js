"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(
      "users_questions",
      "saved_question_id",
      "users_question_id"
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(
      "users_questions",
      "users_question_id",
      "saved_question_id"
    );
  },
};
