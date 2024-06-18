// sequelize-init.js
const { Sequelize, DataTypes } = require("sequelize");

// Configurar la conexión a la base de datos SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.base, // Ruta al archivo de la base de datos SQLite
});

// Definir los modelos
const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const Category = sequelize.define('Category', {
  category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Expense = sequelize.define('Expense', {
  expense_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

// Sincronizar los modelos con la base de datos
async function syncModels() {
  await sequelize.sync({ force: true }); // Esto fuerza la creación de las tablas
  console.log('Modelos sincronizados correctamente.');
}

module.exports = {
  sequelize,
  User,
  Category,
  Expense,
  syncModels,
};
