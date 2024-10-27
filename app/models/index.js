const dbConfig = require('../config/db.config.js');
const { Sequelize } = require('sequelize');

// Crea una instancia de Sequelize con la configuración
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.users = require('./user.model')(sequelize, Sequelize);
db.bootcamps = require('./bootcamp.model')(sequelize, Sequelize);

module.exports = db;
