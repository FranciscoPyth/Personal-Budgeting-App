// models/gastos.js
module.exports = (sequelize, DataTypes) => {
    const Gastos = sequelize.define('Gastos', {
      idGasto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false
      },
      idDivisa: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Divisas',
          key: 'idDivisa'
        }
      },
      idTipoTransaccion: {
        type: DataTypes.INTEGER,
        references: {
          model: 'TiposTransaccion',
          key: 'idTipoTransaccion'
        }
      },
      idCategoria: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Categorias',
          key: 'idCategoria'
        }
      },
      idRelacion: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Relaciones',
          key: 'idRelacion'
        }
      },
      idMedioPago: {
        type: DataTypes.INTEGER,
        references: {
          model: 'MediosDePago',
          key: 'idMedioPago'
        }
      },
      monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }, 
    },
    {
      tableName: 'gastos',
      timestamps: false
    });
  
    return Gastos;
  };
  