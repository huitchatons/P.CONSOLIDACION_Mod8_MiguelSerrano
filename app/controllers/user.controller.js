const db = require("../models");
const User = db.users;
const bcrypt = require("bcrypt");

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Verificar si el correo ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "El correo electrónico ya está en uso." });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "Usuario creado", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los usuarios
exports.findAll = (req, res) => {
  User.findAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

// Obtener un usuario por ID
exports.findUserById = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

// Actualizar un usuario por ID
exports.updateUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const [updated] = await User.update(req.body, { where: { id } });
    if (updated) {
      const updatedUser = await User.findByPk(id);
      res.status(200).json({ message: "Usuario actualizado correctamente.", user: updatedUser });
    } else {
      res.status(404).json({ message: `No se pudo actualizar el usuario con id=${id}.` });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Eliminar un usuario por ID
exports.deleteUserById = (req, res) => {
  const id = req.params.id;

  User.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.status(200).json({ message: "Usuario eliminado correctamente." });
      } else {
        res.status(404).json({ message: `No se pudo eliminar el usuario con id=${id}.` });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};
