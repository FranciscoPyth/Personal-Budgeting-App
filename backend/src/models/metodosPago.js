// backend/src/models/metodosPago.js

module.exports = (sequelize, DataTypes) => {
  const MetodosPago = sequelize.define('MetodosPago', {
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
  return MetodosPago;
};
