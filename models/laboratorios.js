const { Schema, model } = require('mongoose')

const LaboratoriosSchema = Schema({

    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio'],
        unique: true
    },
    
    sala: {
        type: Schema.Types.ObjectId,    //Lo usamos para relacionar el laboratorio a la sala
        ref: 'Sala',                    //Sala donde se dicta el laboratorio
        require: true
    },
});

LaboratoriosSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model('Laboratorios',LaboratoriosSchema);
