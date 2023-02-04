const { response } = require("express");
const { Registro} = require('../models')

const obteneRegistro = async (req, res = response) => {
    //TODO recibir numeros no letras
 //   const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true };
    const [registro] = await Promise.all([
//        Registro.countDocuments(query),
        Registro.find(query)
   
    ])
    /* const [totales, firmas] = await Promise.all([
        Registro.countDocuments(query),
        Registro.find(query)
            .populate('cedula') 
            .skip(Number(desde))
            .limit(Number(limite))
    ])
 */
    res.json({
        registro, 
  //      totales
        
    });
}

module.exports = {
    obteneRegistro,
}