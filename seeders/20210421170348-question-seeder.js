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
          template: "What is the capital of X?",
          columns: "capital",
          type: 2,
          desc: null,
        },
        {
          template: "How many people live in X?",
          columns: "population",
          type: 2,
          desc: null,
        },
        {
          template: "In what continent is X?",
          columns: "continent",
          type: 2,
          desc: null,
        },
        {
          template: "In what region is X?",
          columns: "region",
          type: 2,
          desc: null,
        },
        {
          template: "What is the GDP of X?",
          columns: "gdp",
          type: 2,
          desc: null,
        },
        {
          template:
            "What is the percentage of people in the ages between 15 and 64 in X?",
          columns: "age_15_to_64_years",
          type: 2,
          desc: null,
        },
        {
          template: "Are there more people in X than in Y?",
          columns: "population",
          type: 3,
          desc: true,
        },
        {
          template: "Is X larger than Y?",
          columns: "area",
          type: 3,
          desc: true,
        },
        {
          template: "Does X have a higher population density than Y?",
          columns: "density_pop",
          type: 3,
          desc: true,
        },
        {
          template: "Is the crime rate of X higher than the crime rate in Y?",
          columns: "crime_index",
          type: 3,
          desc: true,
        },
        {
          template:
            "Does X have a more people in the ages between 0 and 14 than Y?",
          columns: "age_0_to_14_years",
          type: 3,
          desc: true,
        },
        {
          template:
            "Is the literacy rate of X higher than the literacy rate in Y?",
          columns: "literacy",
          type: 3,
          desc: true,
        },
        {
          template: "Does X have a higher GDP than Y?",
          columns: "gdp",
          type: 3,
          desc: true,
        },
        {
          template: "Does X have a more phones per 1000 people than Y?",
          columns: "phones_per_1000",
          type: 3,
          desc: true,
        },
        {
          template: "Is the safety rate of X higher than the safety rate in Y?",
          columns: "safety_index",
          type: 3,
          desc: true,
        },
        {
          template:
            "Are restaurants in X more expensive than restaurants in Y?",
          columns: "restaurant_price_index",
          type: 3,
          desc: true,
        },
        {
          template:
            "Is the quality of life in X higher than the quality of life in Y?",
          columns: "quality_of_life_index",
          type: 3,
          desc: true,
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
