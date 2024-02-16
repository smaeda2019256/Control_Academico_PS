const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {
    maestrosGet, 
    putMaestros,
    getMaestroById,
    maestrosPost
} = require('../controllers/maestro.controller');
const { alumnosDelete } = require('../controllers/alumno.controller');

const router = Router();

router.get('/', maestrosGet);

router.get(
    '/:id',
    [
        check('id', 'No es un ID válido').isMongoId(),
        validarCampos
    ], getMaestroById
);

route.post(
    "/",
    [
        check("nombre", "El nombre no puede quedar vacio").not().isEmpty(),
        check("password", "El password debe de ser mayor a 8 caracteres").isLength({ min: 8}),
        check("correo", "El grado no puede quedar vacio").isEmail(),
        validarCampos
    ], maestrosPost
);

router.put(
    "/:id",
    [
        check('id', 'No es un ID válido').isMongoId(),
        validarCampos
    ], putMaestros
);

router.delete(
    "/:id",
    [
        check('id', 'No es un ID válido').isMongoId(),
        validarCampos
    ], alumnosDelete
);

module.exports = router;


