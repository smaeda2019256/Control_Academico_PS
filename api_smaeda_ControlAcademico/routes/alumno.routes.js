const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {
    alumnosPost,
    alumnosGet,
    putAlumnos,
    getAlumnoByid,
    alumnosDelete

} = require('../controllers/alumno.controller');

const router = Router();

router.get("/", alumnosGet);

router.get(
    "/:id",
    [
        check('id', 'No es un ID válido').isMongoId(),
        //check('id').custom(existenteId),
        validarCampos
    ], getAlumnoByid
);