

const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');



class Server {

    constructor() {
        this.app = express();;
        this.port = process.env.PORT;

        // Conectar a db
        dbConnection();

        // Http server
        this.server = http.createServer( this.app );

        // Configuraciones de sockets
        //this.io = socketio( this.server, {/* configuraciones */} );

    }


    middlewares() {

        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( fileUpload() );

        this.app.use( '/api/auth', require('../routes/auth.routes') );
        this.app.use( '/api/articles', require('../routes/articles.routes') );
    }

    execute() {

        // Inicializar Middlewares
        this.middlewares();


        // Inicializar Server
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto:', this.port );
        })
    }


}


module.exports = Server;