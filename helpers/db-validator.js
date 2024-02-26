const Curso = require('../models/curso');
const Alumno = require('../models/alumno');
const Maestro = require('../models/maestro');


const existenteEmailAlumno = async (correo = '') => {
    const existeEmail = await Alumno.findOne({correo});
    if(existeEmail){
        throw new Error(`El EMAIL ${correo} ya fue registrado. Porfavor crea uno Nuevo`);
    }
}

const existeAlumnoById = async (id = '') => {
    const existeAlumno = await Alumno.findOne({id});
    if(!existeAlumno) {
        throw new Error(`El Alumno con el ${id} no EXISTE`);
    }
}

const existeEmailMaestro = async (correo='') => {
    const existeEmail = await Maestro.findOne({correo});
    if(existeEmail){
        throw new Error (`El EMAIL ${correo} ya fue registrado. Porfavor crea uno Nuevo`);
    }
}

const existeMaestroById = async (id='') => {
    const existeMaestro = await Maestro.findOne({id});
    if(!existeMaestro){
        throw new Error(`El Maestro con el ${id} no EXISTE`);
    }
}

const existeCursos = async (nombre = '') => {
    const cursoNormalizado = nombre.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
    const existeNombre =  await Cursor.findOne({nombre: cursoNormalizado});

    if(existeNombre){
        throw new Error(`El Curso ${nombre} ya fue REGISTRADO`);

    }
}

const existeCursoById = async ( id = '') => {
    const existeCurso = await Curso.findOne({id});
    if(!existeCurso){
        throw new Error(`El Curso con el ${ id } NO EXISTE`);
    }
}

const existeCursoByCorreo = async ( correo = '') => {
    const existeUsuario = await Curso.findOne({correo});
    if(!existeUsuario){
        throw new Error(`El Curso con el ${ correo } NO EXISTE`);
    }
}

const validarCursosRepetidos = (cursos) => {
    const set = new Set(cursos);
    if (set.size !== cursos.length) {
        const cursosRepetidos = [...set].filter(curso => cursos.indexOf(curso) !== cursos.lastIndexOf(curso));
        throw new Error(`ERROR - El Curso no se puede AGREGAR Varias Veces ${cursosRepetidos}`);
    }
}

const validarLimiteCursos = (cursos) => {
    if(cursos.length > 3){
        throw new Error('ERROR - Se esta pasando el número MÁXIMO de Cursos - (Son solo 3 Cursos Permitidos)');
    }else if(cursos.length < 1){
        throw new Error('Se debe colocar al menos 1 Curso')
    }
}

const validarExistenciaDeCursos = async (cursos) => {
    const cursosEncontrados = await Curso.find({nombre: {$in: cursos}});
    if(cursos.length !== cursosEncontrados.length){
        const cursosNoEncontrados = cursos.filter(curso => !cursosEncontrados.some(c => c.nombre === curso));
        throw new Error('NO se puedieron ENCONTRAR los Cursos');
    }
}

const validarExistenciaMaestro = async (correo) => {
    const existeMaestro = await Maestro.findOne({ correo });

    if (!existeMaestro) {
        throw new Error(`No se pudo encontrar al Maestro con el Correo: ${correo}`);
    }
}


module.exports = {
    existenteEmailAlumno,
    existeAlumnoById,
    existeEmailMaestro,
    existeMaestroById,
    existeCursos,
    existeCursoById,
    existeCursoByCorreo,
    validarCursosRepetidos,
    validarLimiteCursos,
    validarExistenciaDeCursos,
    validarExistenciaMaestro
}