const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { existeCursoById } = require('../helpers/db-validator');
const { 
    cursosDelete, 
    cursosGet, 
    cursosPost, 
    cursosPut, 
    cursosGetMaestro } = require('../controllers/cursos.controller');

const validarMaestro = require('../middlewares/validar-maestros');

const router = Router();

router.get("/", cursosGet);


router.put(
    "/:id",
    [
        validarJWT,
        validarMaestro,
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ], cursosPut);

router.delete(
    "/:id",
    [
        validarJWT,
        validarMaestro,
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ], cursosDelete);

router.post(
    "/",
    [
        validarJWT,
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("descripcion", "La descripción debe de ser de 10 carácteres como mínimo").isLength({ min: 10, }),
        validarCampos
    ], cursosPost);


    router.post(
        "/maestro",
        [
            validarJWT,
            check("correo", "El Correo del Maestro es obligatorio").isEmail(),
            validarCampos
        ], cursosGetMaestro);

module.exports = router;