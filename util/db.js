var Sequelize = require('sequelize');

var sequelize = new Sequelize(
  'dbname',
  'username',
  'password',
  {
    dialect: 'postgres',
    host: 'localhost'
  }
)

module.exports = sequelize;