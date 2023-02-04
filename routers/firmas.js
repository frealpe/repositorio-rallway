const Router = require('express');
const { check } = require('express-validator');
const { crearFirmas,
        obtenerFirmas,
        actualizarFirmas,
        borrarFirmas} = require('../controllers/firmas');
const { existeFirmasPorId} = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

//Obtener todas las Firmas publico
router.get('/', [
    validarJWT, 
    validarCampos
], obtenerFirmas);

//Obtener una Firmas por id-publico

//Crear un Firmas privado - cualqiuer persona con un token valido
router.post('/', [
    esAdminRole,
    validarJWT,
    check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
    validarCampos
], crearFirmas);

//Actualizar privado token valido
router.put('/:id', [
    validarJWT,
//    esAdminRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeFirmasPorId),
    validarCampos
], actualizarFirmas);
 
//Borrar Firmas solo Admin
router.delete('/:id', [
    validarJWT,
//    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos
], borrarFirmas);

module.exports = router;