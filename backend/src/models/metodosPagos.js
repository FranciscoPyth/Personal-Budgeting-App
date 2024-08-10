// backend/src/models/metodosPago.js

module.exports = (sequelize, DataTypes) => {
  const MetodosPagos = sequelize.define('MetodosPagos', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, { timestamps: false });
  return MetodosPagos;
};
