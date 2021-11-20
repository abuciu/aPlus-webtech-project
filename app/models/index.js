const Sequelize = require("sequelize");
const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './aPlus.db' 
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./projects.model.js")(sequelize, Sequelize);

module.exports = db;
