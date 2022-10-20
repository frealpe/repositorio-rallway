const Router = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagenes,actualizarArchivo} = require('../controllers/uploads');
const { coleccionesPermitidas, existeLaboratorioPorId } = require('../helpers');
const { validarArchivoSubir,validarJWT } = require('../middlewares');
const { validarCampos} = require('../middlewares/validar-campos');


const router = Router();

router.post('/',validarArchivoSubir,cargarArchivo);

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','laboratorios'])),
    validarCampos
],actualizarArchivo);
//actualizarImagenCloudinary);
//actualizarImagen);  //Ruta antigua

router.get('/:coleccion/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','laboratorios'])),
    validarCampos
],mostrarImagenes);

//Actualizar imagen
router.put('/imagen:', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeLaboratorioPorId),
    validarCampos
], actualizarImagen);

module.exports = router;