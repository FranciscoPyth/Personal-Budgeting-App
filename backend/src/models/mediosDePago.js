module.exports = (sequelize, DataTypes) => {
  const MediosDePago = sequelize.define('MediosDePago', {
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
  return MediosDePago;
};
