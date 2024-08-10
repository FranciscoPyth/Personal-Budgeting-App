const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json').development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Divisas = require('./divisas')(sequelize, DataTypes);
db.TiposTransacciones = require('./tiposTransacciones')(sequelize, DataTypes);
db.MetodosPagos = require('./metodosPagos')(sequelize, DataTypes);
db.Categorias = require('./categorias')(sequelize, DataTypes);
db.Gastos = require('./gastos')(sequelize, DataTypes);
db.Usuarios = require('./usuarios')(sequelize, DataTypes);

// Associations
db.Gastos.belongsTo(db.Divisas, { foreignKey: 'divisa_id', targetKey: 'id' });
db.Gastos.belongsTo(db.TiposTransacciones, { foreignKey: 'tipostransaccion_id', targetKey: 'id' });
db.Gastos.belongsTo(db.MetodosPagos, { foreignKey: 'metodopago_id', targetKey: 'id' });
db.Gastos.belongsTo(db.Categorias, { foreignKey: 'categoria_id', targetKey: 'id' });
db.Gastos.belongsTo(db.Usuarios, { foreignKey: 'usuarios_id', targetKey: 'id' });

module.exports = db;
