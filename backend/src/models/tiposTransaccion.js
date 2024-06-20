// models/tiposTransaccion.js
module.exports = (sequelize, DataTypes) => {
    const TiposTransaccion = sequelize.define('TiposTransaccion', {
      idTipoTransaccion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'tiposTransaccion',
      timestamps: false
    });
  
    return TiposTransaccion;
  };
  