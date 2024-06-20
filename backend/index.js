const express = require('express');
const cors = require('cors');
const app = express();
const { sequelize } = require('./src/models'); // Importar sequelize para la sincronización de la base de datos

// para poder leer json en el body
app.use(express.json());

// Configuración de CORS
app.use(cors());

// Configuración de rutas
const routes = require('./src/routes/gastos');
app.use('/', routes);

// Sincronización de la base de datos y arranque del servidor
const port = process.env.PORT || 4000;
sequelize.sync({ force: true }).then(() => {
  app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
    console.log('Database & tables created!');
  });
});

module.exports = app;
