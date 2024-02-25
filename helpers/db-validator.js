const Role = require('../models/role');
const Alumno = require('../models/alumno');
const Maestro = require('../models/maestro');


const existenteEmailAlumno = async (correo = '') => {
    const existeEmail = await Alumno.findOne({correo});
    if(existeEmail){
        throw new Error(`El EMAIL ${correo} ya fue registrado`)
    }
}

const existeAlumnoById = async (id = '') => {
    const existeAlumno = await Alumno.findOne({id});
    if(!existeAlumno) {
        throw new Error(`El Alumno con el ${id} no EXISTE`);
    }
}

module.exports = {
    existenteEmailAlumno,
    existeAlumnoById
}