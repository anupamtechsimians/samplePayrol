require("dotenv").config();
const { Sequelize } = require('sequelize');

const db = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
};

const sequelize = new Sequelize(db.database, db.user, db.password, {
  host: db.host,
  port: db.port,
  dialect: 'mysql', // Specify the database dialect
  // Add any additional options you need for your Sequelize connection
});

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the HRMS database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
