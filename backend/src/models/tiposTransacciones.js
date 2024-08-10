module.exports = (sequelize, DataTypes) => {
  const TiposTransacciones = sequelize.define('TiposTransacciones', {
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
  return TiposTransacciones;
};
