const {response,request} = require('express');

const ususariosGet = (req, res=response) => {
    const query = req.query;
    res.json({
        msg: 'get Controlador',
        query,
    });
}

const usuariosPut =  (req=request, res=response) => {
    const id = req.params.id;
    res.json({
        msg: 'put Controlador',
        id,
    });
}

const usuariosPost =  (req, res) => {            
    res.status(201).json({
        msg: 'post Api'
    });
}

const usuariosDelete =  (req, res) => {
    res.json({
        msg: 'delete Api'
    });
}


module.exports={
    ususariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
}