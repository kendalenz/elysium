const Sequelize = require('sequelize');
const config = {};

if (process.env.QUIET) {
  config.logging = false;
}
const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/earthen_foods',
  config
);

module.exports = conn;