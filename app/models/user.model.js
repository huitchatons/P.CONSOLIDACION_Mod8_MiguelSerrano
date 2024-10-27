// No necesitas importar sequelize directamente aquí, ya se pasa desde index.js
const bcrypt = require('bcryptjs');

// El módulo exporta una función que recibe sequelize y DataTypes como parámetros
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,  // Asegura que no haya emails duplicados
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        hooks: {
            beforeCreate: async (user) => {
                // Hashear la contraseña antes de guardar el usuario
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    });

    return User;  // Retorna el modelo
};
