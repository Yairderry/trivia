"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "questions",
      [
        {
          template: "Which country is most populous?",
          columns: "population",
          type: 1,
          desc: true,
        },
        {
          template: "Which country is least populous?",
          columns: "population",
          type: 1,
          desc: false,
        },
        {
          template: "Which country is the largest by total area?",
          columns: "area",
          type: 1,
          desc: true,
        },
        {
          template: "Which country is the smallest by total area?",
          columns: "area",
          type: 1,
          desc: false,
        },
        {
          template: "Which country is the most densely populated?",
          columns: "density_pop",
          type: 1,
          desc: true,
        },
        {
          template: "Which country is the least densely populated?",
          columns: "density_pop",
          type: 1,
          desc: false,
        },
        {
          template: "Which country has the most people over the age of 65?",
          columns: "age_above_65_years",
          type: 1,
          desc: true,
        },
        {
          template: "Which country has the least people over the age of 65?",
          columns: "age_above_65_years",
          type: 1,
          desc: false,
        },
        {
          template: "Which country has the highest crime ranking?",
          columns: "crime_index",
          type: 1,
          desc: true,
        },
        {
          template: "Which country has the lowest crime ranking?",
          columns: "crime_index",
          type: 1,
          desc: false,
        },
        {
          template: "Which country has the most cell phones per person?",
          columns: "phones_per_1000",
          type: 1,
          desc: true,
        },
        {
          template: "Which country has the least cell phones per person?",
          columns: "phones_per_1000",
          type: 1,
          desc: false,
        },
      ].map((country, i) => {
        country.id = i + 1;
        country.created_at = new Date();
        country.updated_at = new Date();
        return country;
      }),
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("questions", null, {});
  },
};
