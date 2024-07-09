module.exports = (sequelize, DataTypes) => {
  const TiposTransaccion = sequelize.define('TiposTransaccion', {
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
  return TiposTransaccion;
};
