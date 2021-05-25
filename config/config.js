require("dotenv").config();

module.exports = {
  development: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    define: {
      underscored: true,
    },
    socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
    logging: false,
  },
  test: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    define: {
      underscored: true,
    },
    socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
  },
  production: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    dialect: "mysql",
    define: {
      underscored: true,
    },
    dialectOptions: {
      socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
    },
  },
};
