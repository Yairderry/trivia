require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "trivia",
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      underscored: true,
    },
  },
  test: {
    username: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "trivia_test",
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      underscored: true,
    },
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
