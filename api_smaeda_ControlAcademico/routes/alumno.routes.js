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

router.post(
    "/",
    [
        check("nombre", "El nombre no puede quedar vacio").not().isEmpty(),
        check("password", "El password debe de ser mayor a 8 caracteres").isLength({ min: 8 }),
        check("correo", "Este no es un correo válido").isEmail(),
        check("grado", "El grado no puede quedar vacio").not().isEmpty(),
        validarCampos,
    ], alumnosPost

);

router.put(
    "/:id",
    [
        check('id', 'No es un ID válido').isMongoId(),
        validarCampos
    ], putAlumnos
);

module.exports = router;