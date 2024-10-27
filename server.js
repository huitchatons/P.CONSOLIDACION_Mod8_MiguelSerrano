const express = require('express'); // Importar Express
const dbConfig = require('./app/config/db.config.js');
const db = require('./app/models');
const userController = require('./app/controllers/user.controller');
const bootcampController = require('./app/controllers/bootcamp.controller');

// Importar el middleware de autenticación
const authMiddleware = require('./app/middleware/auth'); // Asegúrate de que la ruta sea correcta

const app = express(); // Crear una instancia de Express
const PORT = process.env.PORT || 3000; // Definir el puerto en el que el servidor escuchará

// Middleware para parsear el JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar y usar las rutas de usuarios
const userRoutes = require('./app/routes/user.routes');
app.use('/api/users', userRoutes);

// Ruta para la raíz
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de Bootcamp!');
});

// Sincronizar la base de datos y luego iniciar el servidor
db.sequelize.sync({ force: true }).then(() => {
  console.log('Eliminando y resincronizando la base de datos.');
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error('Error al sincronizar la base de datos:', error);
});
