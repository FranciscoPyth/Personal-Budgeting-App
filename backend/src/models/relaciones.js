// models/relaciones.js
module.exports = (sequelize, DataTypes) => {
    const Relaciones = sequelize.define('Relaciones', {
      idRelacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'relaciones',
      timestamps: false
    });
  
    return Relaciones;
  };
  