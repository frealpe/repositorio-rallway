const Router = require('express');
const { obtenerRecolector} = require('../controllers/Recolector');
const { validarJWT, validarCampos} = require('../middlewares');

const router = Router();

//Obtener todas las Recolector publico
router.get('/', [validarJWT, validarCampos], obtenerRecolector);


module.exports = router;