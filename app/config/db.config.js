module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "lolito",
  DB: "db_bootcamp",
  dialect: "postgres",
  pool: {
    max: 5,     // Máximo número de conexiones
    min: 0,     // Mínimo número de conexiones
    acquire: 30000, // Tiempo máximo para adquirir una conexión
    idle: 10000 // Tiempo máximo para una conexión inactiva
  }
};
