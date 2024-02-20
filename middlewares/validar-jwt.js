const Alumno = require('../models/alumno');
const Maestro = require('../models/maestro');
const jwt = require('jsonwebtoken');
const { request, response } = require('express');

const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay TOKEN en la petición',
        });
    }
    try{
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const alumno = await Alumno.findById(uid);
        if(!alumno){
            return res.status(401).json({
                msg: 'El Alumno no existe en la Base de Datos'
            });
        }

        if(!alumno.estado){
            return res.status(401).json({
                msg: 'TOKEN no válido, Alumno con estado false'
            });
        };

        req.alumno = alumno;
        next();

    }catch(e){
        console.log(e);
        res.status(401).json({
            smg: 'TOKEN no válido'
        });
    }
}

module.exports = {
    validarJWT
}