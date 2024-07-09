const express = require('express');
const app = express();
const db = require('./src/models');
const cors = require('cors')

app.use(express.json());
app.use(cors)

// Sincronizar la base de datos
db.sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Error syncing database:', err));

// Configurar rutas
app.use('/api/divisas', require('./src/routes/divisas'));
app.use('/api/tipostransaccion', require('./src/routes/tipostransaccion'));
app.use('/api/mediosPago', require('./src/routes/mediosPago'));
app.use('/api/categorias', require('./src/routes/categorias'));
app.use('/api/gastos', require('./src/routes/gastos'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
