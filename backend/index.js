const express = require('express');
const cors = require('cors');
const app = express();
const { sequelize } = require('./src/models'); 

// para poder leer json en el body
app.use(express.json());

// Configuración de CORS
app.use(cors());

// Configuración de rutas
const gastosRoutes = require('./src/routes/gastos');
const divisasRoutes = require('./src/routes/divisas');
const mediosDePagoRoutes = require('./src/routes/mediosPago');
const tiposTransaccionRoutes = require('./src/routes/tiposTransaccion');
const categoriasRoutes = require('./src/routes/categorias');

app.use(gastosRoutes);
app.use(divisasRoutes);
app.use(mediosDePagoRoutes);
app.use(tiposTransaccionRoutes);
app.use(categoriasRoutes);

// Sincronización de la base de datos y arranque del servidor
const port = process.env.PORT || 4000;
sequelize.sync({ force: true }).then(() => {
  app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
    console.log('Database & tables created!');
  });
});

module.exports = app;
