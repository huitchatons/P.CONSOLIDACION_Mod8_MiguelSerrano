const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.users;

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  // Comprobar si el token está presente en los headers
  if (!token) {
    return res.status(403).send({
      message: "¡No se proporcionó ningún token!"
    });
  }

  // Verificar si el token es válido
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "¡No autorizado! El token es inválido o ha expirado."
      });
    }
    // Guardar el userId del token decodificado para su uso posterior
    req.userId = decoded.id;
    next();
  });
};

// Middleware para verificar si el usuario es administrador
const isAdmin = (req, res, next) => {
  // Buscar al usuario por su ID que se obtuvo del token
  User.findByPk(req.userId).then(user => {
    if (!user) {
      return res.status(404).send({
        message: "Usuario no encontrado."
      });
    }

    // Verificar si el rol del usuario es 'admin'
    if (user.role === "admin") {
      next(); // Si es admin, continuar con la solicitud
    } else {
      res.status(403).send({
        message: "¡Se requiere rol de administrador!"
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error al verificar el rol de administrador: " + err.message
    });
  });
};

module.exports = {
  verifyToken,
  isAdmin
};
