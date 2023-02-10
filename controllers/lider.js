const { response } = require("express");
const { Lider } = require('../models')

//Obtener Lider -paginado -total- populate
const obtenerLider = async (req, res = response) => {

    //TODO recibir numeros no letras
    const { limite = 300, desde = 0 } = req.query;
    const query = { estado: true };

    const [totales, lider,descripcion] = await Promise.all([
        Lider.countDocuments(query),
        Lider.find(query)
            .populate('nombre','firmas')
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        totales,
        descripcion,
        lider,
    });
}

//Obtener Lider - por id populate ()
const obtenerLiderid = async (req, res = response) => {

    const { id } = req.params;
    const lider = await Lider.findById(id);
    res.json({
        lider
    });
}

//Crear una Lider 
const crearLider = async (req, res = response) => {
   
    const cedula = req.body.cedula;  
    const {...data } = req.body;
    const LiderDB = await Lider.findOne({cedula});

    if (LiderDB) {
        return res.status(400).json({
            msg: `El Lider ${LiderDB.nombre},ya existe`
        });
    } 
    /* const data = {
        nombre,
        cedula,
        celular,
        municipio
   //     firmas: req.body.firmas.toUpperCase()
    } */
    const lider = new Lider(data);
    await lider.save();

    res.status(201).json(lider);

}

//Actulizar Lider 
const actualizarLider = async (req, res = response) => {

    const { id } = req.params;
    const {...data } = req.body;

    console.log(data);
    if (data.nombre) {
        data.codigo = data.codigo;
        data.nombre = data.nombre.toUpperCase();
        data.cedula = data.cedula;
        data.municipio = data.municipio.toUpperCase(); 
        //TODO BORRAR

    }
    const lider = await Lider.findByIdAndUpdate(id, data,{ new: true });
    res.json(lider);
}

//Borrar Lider -estado: false
const borrarLider = async (req, res = response) => {
    const {id} = req.params;
    console.log(id);    
    //const LiderBorrada = await Lider.findByIdAndUpdate(id, {estado:false },{ new: true });
    const LiderBorrado = await Lider.findByIdAndRemove(id);
    res.json(LiderBorrado);
}

module.exports = {
    crearLider,
    obtenerLider,
    obtenerLiderid,
    actualizarLider,
    borrarLider
}