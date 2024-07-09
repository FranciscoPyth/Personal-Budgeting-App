const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json').development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Divisas = require('./divisas')(sequelize, DataTypes);
db.TiposTransaccion = require('./tipostransaccion')(sequelize, DataTypes);
db.MetodosPago = require('./mediosDePago')(sequelize, DataTypes);
db.Categorias = require('./categorias')(sequelize, DataTypes);
db.Gastos = require('./gastos')(sequelize, DataTypes);

// Associations
db.Gastos.belongsTo(db.Divisas, { foreignKey: 'divisa_id' });
db.Gastos.belongsTo(db.TiposTransaccion, { foreignKey: 'tipostransaccion_id' });
db.Gastos.belongsTo(db.MetodosPago, { foreignKey: 'metodopago_id' });
db.Gastos.belongsTo(db.Categorias, { foreignKey: 'categoria_id' });

module.exports = db;
