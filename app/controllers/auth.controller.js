const db = require("../models");
const User = db.users;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({
    where: {
      email: email
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }

    // Verificar la contraseña
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Contraseña incorrecta."
      });
    }

    // Generar el token
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: 86400 // 24 horas
    });

    res.status(200).send({
      id: user.id,
      email: user.email,
      accessToken: token
    });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};
