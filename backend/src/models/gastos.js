module.exports = (sequelize, DataTypes) => {
  const Gastos = sequelize.define('Gastos', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING(255)
    },
    monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    divisa_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Divisas',
        key: 'id'
      }
    },
    tipostransaccion_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'TiposTransaccion',
        key: 'id'
      }
    },
    metodopago_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'MetodosPago',
        key: 'id'
      }
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categorias',
        key: 'id'
      }
    }
  }, { timestamps: false });
  return Gastos;
};
