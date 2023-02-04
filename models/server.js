const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {
    /////////////////////////////////////////////////
    constructor() {
        this.app = express();
        this.port = process.env.PORT;  

        this.paths = {
            auth:           '/api/auth',
            usuarios:       '/api/usuarios',
            lider:          '/api/lider',
            firmas:         '/api/firmas',
            registraduria:  '/api/registraduria',
            recolector:     '/api/recolector',
/*             buscar:         '/api/buscar',
            uploads:        '/api/uploads' */

        }
        //Conectar la base de datos
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //Rutas de aplicación
        this.routes();
    }
    /////////////////////////////////////////////////
    async conectarDB() {

        await dbConnection();

    }
    /////////////////////////////////////////////////
    middlewares() {
        //CORS
        this.app.use(cors());
        //Parseo del body
        this.app.use(express.json());
        //Directorio publico
        this.app.use(express.static('public'));
        //Carpeta para guardar archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));  

    }
    /////////////////////////////////////////////////
    routes() {
        this.app.use(this.paths.auth, require('../routers/auth'));
        this.app.use(this.paths.usuarios, require('../routers/usuarios'));
        this.app.use(this.paths.lider, require('../routers/lider'));        
        this.app.use(this.paths.firmas, require('../routers/firmas'));
        this.app.use(this.paths.registraduria, require('../routers/registraduria'));
        this.app.use(this.paths.recolector, require('../routers/recolector'));
/*        this.app.use(this.paths.buscar, require('../routers/buscar'));
        this.app.use(this.paths.uploads, require('../routers/uploads'));
 */
    }
    //////////////////////////////////////////////////
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor Corriendo', this.port);
        });
    }
}
/////////////////////////////////////////////////
module.exports = Server;