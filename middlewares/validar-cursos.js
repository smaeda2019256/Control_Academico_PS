const Curso = require('../models/curso');
const jwt = require('jsonwebtoken');
const Alumno = require('../models/alumnos');

const validarCursos = async (req, res, next) => {
    try{
        const {nombreMateria} = req.body;
        const token = req.header("x-token")

        if (!token) {
            return res.status(401).json({
                error: "No  hay un token proporcionado"
            });
        }

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const alumno = await Alumno.findById(uid);

        if (!alumno) {
            return res.status(404).json({
                error: 'El Alumno NO EXISTE',
            });
        }

        const curso = await Curso.findOne({ nombre: nombreMateria });
        if (!curso) {
            return res.status(404).json({
                error: 'El Curso NO EXISTE',
            });
        }

        if (alumno.cursos.includes(curso._id)) {
            return res.status(400).json({
                error: 'ERROR - El Alumno ya está inscrito en este Curso',
            });
        }

        if (alumno.cursos.length >= 3) {
            return res.status(400).json({
                error: 'ERROR - El Alumno ya está inscrito en el límite de Cursos',
            });
        }

        req.curso = curso;
        req.alumno = alumno;

        next();
    }catch(e){
        res.status(500).json({
            msg: "ERROR al poder Validar el Curso",
            error: error.message
        });

    }
};

module.exports = {validarCursos};