const { Schema, model } = require('mongoose')

const SalasSchema = Schema({

    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio'],
        unique: true
    },
     laboratorista: {
        type: String,
    },
});

SalasSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model('Salas',SalasSchema);
