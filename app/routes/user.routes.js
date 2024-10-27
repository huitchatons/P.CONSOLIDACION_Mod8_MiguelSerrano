const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const verifySignUp = require("../middleware/verifySignUp");
const authJwt = require("../middleware/auth");

// Middleware para permitir encabezados
router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Ruta para registrar un nuevo usuario
router.post("/", [verifySignUp.checkDuplicateEmail], userController.createUser);

// Ruta para el inicio de sesión
router.post("/login", authController.login);

// Rutas que requieren autenticación
router.get("/", [authJwt.verifyToken], userController.findAll);
router.get("/:id", [authJwt.verifyToken], userController.findUserById);
router.put("/:id", [authJwt.verifyToken], userController.updateUserById);
router.delete("/:id", [authJwt.verifyToken], userController.deleteUserById);

module.exports = router;
