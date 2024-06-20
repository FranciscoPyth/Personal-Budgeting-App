const { Sequelize, DataTypes } = require('sequelize');
const config = require('../.data/config.json');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const MediosDePago = require('./mediosDePago')(sequelize, DataTypes);
const Divisas = require('./divisas')(sequelize, DataTypes);
const TiposTransaccion = require('./tiposTransaccion')(sequelize, DataTypes);
const Categorias = require('./categorias')(sequelize, DataTypes);
const Relaciones = require('./relaciones')(sequelize, DataTypes);
const Gastos = require('./gastos')(sequelize, DataTypes);

Gastos.belongsTo(MediosDePago, { foreignKey: 'idMedioPago' });
Gastos.belongsTo(Divisas, { foreignKey: 'idDivisa' });
Gastos.belongsTo(TiposTransaccion, { foreignKey: 'idTipoTransaccion' });
Gastos.belongsTo(Categorias, { foreignKey: 'idCategoria' });
Gastos.belongsTo(Relaciones, { foreignKey: 'idRelacion' });

sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
});

module.exports = {
  sequelize,
  MediosDePago,
  Divisas,
  TiposTransaccion,
  Categorias,
  Relaciones,
  Gastos
};
