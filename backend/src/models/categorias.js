// models/categorias.js
module.exports = (sequelize, DataTypes) => {
    const Categorias = sequelize.define('Categorias', {
      idCategoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'categorias',
      timestamps: false
    });
  
    return Categorias;
  };
  