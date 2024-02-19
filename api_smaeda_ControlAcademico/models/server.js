const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.alumnoPath = '/api/alumnos'
        this.maestroPath = '/api/maestros'
        this.loginPath = '/api/auth'
        this.conectarDB();
        this.Middlewares();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    Middlewares() {
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.alumnoPath, require('../routes/alumno.routes'));
        this.app.use(this.maestroPath, require('../routes/maestro.routes'));
        this.app.use(this.loginPath, require('../routes/auth.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor ejecutandose exitosamente en el puerto:', this.port)
        });
    }
}

module.exports = Server;