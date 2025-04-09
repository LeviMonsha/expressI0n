const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("expressI0n", "admin", "admin", {
  host: "db",
  dialect: "postgres",
});

module.exports = sequelize;
