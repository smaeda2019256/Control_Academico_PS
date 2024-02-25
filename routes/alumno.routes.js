const { Router } = require('express');
const { check } = require('express-validator');
const { existenteEmailAlumno, existeAlumnoById } = require('../helpers/db-validator.js');
const {valdarAccionesDeAlumno } = require('../middlewares/validar-alumnos.js');
const { validarCampos } = require('../middlewares/validar-campos');
const {
    alumnosPost,
    agregarCursoAlumno,
    putAlumnos,
    getCursoAlumnoByToken,
    alumnosDelete

} = require('../controllers/alumno.controller.js');
const { validarJWT } = require('../middlewares/validar-jwt.js');

const router = Router();

router.get(
    "/:id",
    [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existenteId),
        validarCampos
    ], getAlumnoByid
);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede quedar vacio").not().isEmpty(),
        check("password", "El password debe de ser mayor a 6 caracteres").isLength({ min: 6 }),
        check("correo", "Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmailAlumno),
        validarCampos,
    ], alumnosPost

);

router.put(
    "/:id",
    [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeAlumnoById),
        validarCampos,
        validarJWT,
        valdarAccionesDeAlumno,
    ], putAlumnos
);

router.delete(
    "/:id",
    [
        
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existenteId),
        validarCampos
    ], alumnosDelete
);

module.exports = router;