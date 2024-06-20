// models/divisas.js
module.exports = (sequelize, DataTypes) => {
    const Divisas = sequelize.define('Divisas', {
      idDivisa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'divisas',
      timestamps: false
    });
  
    return Divisas;
  };
  