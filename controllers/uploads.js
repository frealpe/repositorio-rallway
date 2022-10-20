const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2

cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require('express');
const { subirArchivo } = require('../helpers');
const { Usuario, Componente} = require('../models');

/////////////////////////////////////////////////////////////////
const cargarArchivo = async (req, res = response) => {
  //console.log(req.files);
  //const carpeta = req.header('Tipo');

  try {
    //imagenes oppr defecto y el path es el mismo
    //const nombre= await subirArchivo(req.files,undefined,'componente');
    const nombre = await subirArchivo(req.files);
    res.json({
      nombre
    });
  } catch (error) {
    res.status(400).json({ error });
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////
const actualizarArchivo = async (req, res = response) => {

  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
///////////////////////////////////////////////////////    
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `No existe un usuario con el id ${id}` });
      }
      break;
///////////////////////////////////////////////////////
    case 'componentes':
      modelo = await Componente.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `No existe un componentes con el id ${id}` });
      }
      break;
///////////////////////////////////////////////////////
      case 'laboratorios':
        modelo= await Laboratorio.findById(id);
        if (!modelo) {
          return res.status(400).json({ msg: `No existe una guia con el id ${id}` });
        }        

    default:
      return res.status(500).json({ msg: 'Se olvido validar esto' });
  }

  //Limpiar imágenes previas solo deja grabada una sola imagen 
  //Para mi catalogo no se hace necesario

  if (modelo.guia) {
    //borrar 
    const pathGuia = path.join(__dirname, '../uploads', coleccion, modelo.guia);
    if (fs.existsSync(pathGuia)) {
      fs.unlinkSync(pathGuia);
    }
  }

  const nombre = await subirArchivo(req.files, undefined, coleccion);
  modelo.guia = nombre;
  await modelo.save();

  res.json(modelo);
}
//////////////////////////////////////////////////////////////////////////////////////////////
const actualizarImagen = async (req, res = response) => {

  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
///////////////////////////////////////////////////////    
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `No existe un usuario con el id ${id}` });
      }
      break;
///////////////////////////////////////////////////////
    case 'componentes':
      modelo = await Componente.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `No existe un componentes con el id ${id}` });
      }
      break;
///////////////////////////////////////////////////////
      case 'laboratorios':
        modelo= await Laboratorio.findById(id);
        if (!modelo) {
          return res.status(400).json({ msg: `No existe una guia con el id ${id}` });
        }        

    default:
      return res.status(500).json({ msg: 'Se olvido validar esto' });
  }

  //Limpiar imágenes previas solo deja grabada una sola imagen 
  //Para mi catalogo no se hace necesario

  if (modelo.img) {
    //borrar 
    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }

  const nombre = await subirArchivo(req.files, undefined, coleccion);
  modelo.img = nombre;
  await modelo.save();

  res.json(modelo);
}

//////////////////////////////////////////////////////////////////////////////////////////////
const mostrarImagenes = async(req, res = response) => {

  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `No existe un usuario con el id ${id}` });
      }
      break;

    case 'componentes':
      modelo = await Componente.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `No existe un producto con el id ${id}` });
      }
      break;
    default:
      return res.status(500).json({ msg: 'Se olvido validar esto' });
  }

  //Limpiar imágenes previas solo deja grabada una sola imagen 
  //Para mi catalogo no se hace necesario

  if (modelo.img) {
    //borrar 
    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
    if (fs.existsSync(pathImagen)) {
      console.log('Existe');
      return res.sendFile(pathImagen)
    }
  }

  const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
  return res.sendFile(pathImagen);
  
}

////////////////////////////////////////////////////////////////

module.exports = {
  cargarArchivo,
  actualizarArchivo,
  actualizarImagen,
  mostrarImagenes,
}