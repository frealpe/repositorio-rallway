const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        //Middlewares
        this.middlewares();
        //Rutas de aplicación
        this.routes();
    }

    middlewares(){
        this.app.use(cors());
        //Directorio publico
        this.app.use(express.static('public'));

    }

    routes() {
    this.app.use(this.usuariosPath,require('../routers/usuarios'));

    }
//////////////////////////////////////////////////
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor Corriendo',this.port);
        });
    }
}

module.exports = Server;