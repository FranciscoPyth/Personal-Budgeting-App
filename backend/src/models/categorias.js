module.exports = (sequelize, DataTypes) => {
  const Categorias = sequelize.define('Categorias', {
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
  return Categorias;
};
