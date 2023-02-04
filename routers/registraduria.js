const Router = require('express');
const { obteneRegistro } = require('../controllers/registraduria');
const { validarJWT, validarCampos } = require('../middlewares');

const router = Router();

//Obtener todas las Firmas publico
router.get('/', [
    validarJWT, 
    validarCampos
], obteneRegistro);

module.exports = router;