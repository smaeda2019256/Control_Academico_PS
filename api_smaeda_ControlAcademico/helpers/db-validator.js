const Role = require('../models/role');
const Alumno = require('../models/alumno');
const Maestro = require('../models/maestro');

const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error (`El rol ${ role } no existe en la Base de Datos`);
    }
}

const existenteEmail = async (correo = '') => {
    const existeEmailA = await Alumno.findOne({correo});
    const existeEmailM = await Maestro.findOne({correo});
    if(!existeEmailA){
        throw new Error(`El correo ${ correo } ya esta registrado en la Base de Datos`);
    }
    if(!existeEmailM){
        throw new Error(`El correo ${ correo } ya esta registrado en la Base de Datos`);
    }
}

const existenteId = async (id = '') => {
    const existeIdA = await Alumno.findOne({id});
    const existeIdM = await Maestro.findOne({id});
    if(existeIdA){
        throw new Error(`El alumno con el ID ${ id } no existe`);
    }
    if(existeIdM){
        throw new Error(`El maestro con el ID ${ id } no existe`);
    }
}

module.exports = {
    esRoleValido,
    existenteEmail,
    existenteId
}