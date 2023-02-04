const { Schema, model } = require('mongoose')

const RecolectoresSchema = Schema({

    codigo:{
        type:String,
        require: [true, 'El nombre es obligatorio'],
    },
    
    recolector: {
       type: String,
    },
    
    tomo:{
        type:String,
    },

    etiquetas_de_fila:{
        type:String,
    },
    
    uniprocedencia_en_cedula:{
        type:String,
    },
    
    analizado_sin_novedad:{
        type:String,
    },

    cedula_ilegible:{
        type:String,
    },

    cedula_no_corresponde:{
        type:String,
    },

    casilla_en_blanco:{
        type:String,
    },
    
    no_archivo:{
        type:String,
    },
    
    no_en_censo:{
        type:String,
    },

    no_en_censo_nacional:{
        type:String,
    },
    
    nombre_ilegible:{
        type:String,
    },
    
    nombre_incompleto:{
        type:String,
    },
    
    registro_duplicado:{
        type:String,
    },
    
    renglon_en_blanco:{
        type:String,
    },
    
    total_general:{
        type:String,
    },
});

RecolectoresSchema.methods.toJSON = function () {
    const { __v, estado,_id, ...data } = this.toObject();
    data.id=_id;
    return data;
}

module.exports = model('Recolectores',RecolectoresSchema);
