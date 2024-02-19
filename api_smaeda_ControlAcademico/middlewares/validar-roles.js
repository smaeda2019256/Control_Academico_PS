const { request, response } = require('express');

const StudentRole = (req = request, resp = response, next) => {
    if(!req.alumno){
        return resp.status(500).json({
            msg: 'Quiere verificar un rol sin validar el TOKEN primero'
        });
    }

    const { role, nombre } = req.alumno;

    if( role !== "STUDEN_ROLE"){
        return resp.status(400).json({
            msg: `${nombre} no es un ADMINISTRADOR, no puede estar aquí`
        });
    }
    next();
}

module.exports = {
    StudentRole
}