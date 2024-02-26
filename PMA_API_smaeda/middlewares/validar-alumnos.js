const Alumno = require('../models/alumno');

const valdarAccionesDeAlumno = async (req, res, next) => {
    try {
        const { id } = req.params;
        const alumnoAut = req.alumno;

        const alumno = await Alumno.findById(id);
        if (!alumno) {
            return res.status(404).json({
                msg: 'El Alumno no fue encontrado'
            });
        }

        if (alumnoAut._id.toString() !== alumno._id.toString()) {
            return res.status(403).json({
                msg: 'El Alumno que fue Autenticado no tiene PERMISO para eliminar o actualizar a otro Alumno',
            });
        }

        req.alumnoAction = alumno;

        next();
    } catch (error) {
        res.status(500).json({
            msg: 'Hubo un ERROR al Validar aciioes del Alumno',
            error: error.message
        });
    }
};
module.exports = {
    valdarAccionesDeAlumno
}