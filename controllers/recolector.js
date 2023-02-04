const { response } = require("express");
const { Recolectores } = require('../models')

//Obtener Recolector -paginado -total- populate
const obtenerRecolector = async (req, res = response) => {

    //TODO recibir numeros no letras
    const query = { estado: true };
    console.log(query);
    const [data,registros] = await Promise.all([
        Recolectores.countDocuments(query),
        Recolectores.find(query)
    ])

    res.json({
//        data,
        registros 
    });
}

module.exports = {
    obtenerRecolector,
}