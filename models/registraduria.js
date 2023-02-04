const { Schema, model } = require('mongoose')

const RegisSchema = Schema({

    tomo: {
        type: String,        
    },
    
    folio: {
        type: String,
    },

    renglon: {
        type: String,
    },

    cedula:{
        type:String,
        require: [true, 'La cédula es obligatorio'],
    },

    nombrenov:{
        type:String,
    },

});

RegisSchema.methods.toJSON = function () {
    const { _id,__v,...data } = this.toObject();
    data.id=_id;
    return data;
}

module.exports = model('Registrado',RegisSchema);
