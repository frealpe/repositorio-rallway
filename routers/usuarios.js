
const {Router} = require('express');
const { ususariosGet,usuariosPut , usuariosPost,usuariosDelete } = require('../controllers/usuarios');

const router = Router();


router.get('/', ususariosGet );
//////////////////////////////////////////////////
router.put('/:id', usuariosPut );
//////////////////////////////////////////////////
router.post('/',usuariosPost);
//////////////////////////////////////////////////
router.delete('/',usuariosDelete)

module.exports = router;