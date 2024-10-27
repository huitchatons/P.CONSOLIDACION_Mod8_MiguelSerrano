const db = require("../models");
const User = db.users;

const checkDuplicateEmail = (req, res, next) => {
  // Verificar si el correo ya existe
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "¡El correo electrónico ya está en uso!"
      });
      return;
    }

    next();
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
};

const verifySignUp = {
  checkDuplicateEmail
};

module.exports = verifySignUp;
