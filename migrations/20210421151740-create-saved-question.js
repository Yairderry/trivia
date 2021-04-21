'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Saved_questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question: {
        type: Sequelize.STRING
      },
      option_1: {
        type: Sequelize.STRING
      },
      option_2: {
        type: Sequelize.STRING
      },
      option_3: {
        type: Sequelize.STRING
      },
      option_4: {
        type: Sequelize.STRING
      },
      answer: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.FLOAT
      },
      vote_count: {
        type: Sequelize.INTEGER
      },
      answered_correct: {
        type: Sequelize.INTEGER
      },
      answered_wrong: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Saved_questions');
  }
};