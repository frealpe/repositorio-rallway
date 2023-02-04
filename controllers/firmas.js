const { response } = require("express");
const { Firmas } = require('../models')

//Obtener Firmas -paginado -total- populate
const obtenerFirmas = async (req, res = response) => {
    //TODO recibir numeros no letras
    const { limite = 50, desde = 0 } = req.query;
    const query = { estado: true };

    const [totales, firmas] = await Promise.all([
        Firmas.countDocuments(query),
        Firmas.find(query)
            .populate('nombre','sala')
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        totales,
        firmas,
    });
}

//Crear una Firmas 
const crearFirmas = async (req, res = response) => {
   
//TODO evaluar por cedula
    const data  = req.body;

    const cedula = data.cedula.toUpperCase();

    const FirmasDB = await Firmas.findOne({ cedula });

    if (FirmasDB) {
        return res.status(400).json({
            msg: `El usuario ${FirmasDB.cedula},ya existe`
        });
    }

/*     const data = {
        nombre,
//        sala: req.body.sala.toUpperCase()
    } */
    const firmas = new Firmas(data);
    await firmas.save();
    res.status(201).json(firmas);
}

//Actulizar Firmas 
const actualizarFirmas = async (req, res = response) => {

    const { id } = req.params;
    const {...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
        data.firmas = data.firmas;
        console.log(data.nombre,data.firmas);
    }

    const firmas = await Firmas.findByIdAndUpdate(id, data,{ new: true });
    res.json(firmas);
}

//Borrar Firmas -estado: false
const borrarFirmas = async (req, res = response) => {
    const { id } = req.params;
    //const FirmasBorrada = await Firmas.findByIdAndUpdate(id, {estado:false },{ new: true });
    const firmasBorrada = await Firmas.findOneAndRemove(id);
    res.json(firmasBorrada);

}

module.exports = {
    crearFirmas,
    obtenerFirmas,
    actualizarFirmas,
    borrarFirmas
}