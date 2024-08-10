// src/models/usuarios.js

module.exports = (sequelize, DataTypes) => {
  const Usuarios = sequelize.define('Usuarios', {
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
      allowNull: false,
      unique: true,
    },
  }, {
    timestamps: false, // Deshabilita la gestión automática de timestamps
  });
  return Usuarios;
};
