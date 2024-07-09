module.exports = (sequelize, DataTypes) => {
  const Divisas = sequelize.define('Divisas', {
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
  return Divisas;
};
