//SE CREA EL ESQUEMA DE USUARIO PARA LA BASE DE DATOS

const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        requiered: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        requiered: [true, 'El correo es obligatorio'],
        unique: true
    },

    password: {
        type: String,
        requiered: [true, 'La contraseña es obligatorio'],
    },
    img: {
        type: String,
    },

    rol: {
        type: String,
        requiered: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },

    estado: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false
    },

});

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model('Usuarios', UsuarioSchema)