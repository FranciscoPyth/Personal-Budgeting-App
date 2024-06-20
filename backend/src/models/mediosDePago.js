// models/mediosDePago.js
module.exports = (sequelize, DataTypes) => {
    const MediosDePago = sequelize.define('MediosDePago', {
      idMedioPago: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'mediosDePago',
      timestamps: false
    });
  
    return MediosDePago;
  };
  