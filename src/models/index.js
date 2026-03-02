'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const db = {};

// ✅ Conexion Sequelize (usa ENV)
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

// ✅ Loader recursivo
function loadModels(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (file.startsWith('.')) return;

    if (stat.isDirectory()) {
      loadModels(fullPath);
      return;
    }

    if (
      file !== basename &&
      file.endsWith('.js') &&
      !file.endsWith('.test.js')
    ) {
      const factory = require(fullPath);
      const model = factory(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    }
  });
}

loadModels(__dirname);

// ✅ Asociaciones
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;