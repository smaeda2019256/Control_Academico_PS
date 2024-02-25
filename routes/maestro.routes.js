const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt.js');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeEmailMaestro, existeMaestroById } = require('../helpers/db-validator.js');

const {
    maestrosGet, 
    putMaestros,
    getMaestroById,
    maestrosPost,
    maestrosDelete
} = require('../controllers/maestro.controller');

const router = Router();

router.get('/', maestrosGet);

router.get(
    '/:id',
    [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeMaestroById),
        validarCampos
    ], getMaestroById
);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede quedar vacio").not().isEmpty(),
        check("password", "El password debe de ser mayor a 8 caracteres").isLength({ min: 8}),
        check("correo", "El correo no es válido").isEmail(),
        check("correo").custom(existeEmailMaestro),
        check("role", "El ROLE solo puede ser ACTUALIZADO no puede ser Ingresado"),
        validarCampos
    ], maestrosPost
);

router.put(
    "/:id",
    [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeMaestroById),
        check('role', "El ROLE no EXISTE en la DB"),
        validarCampos
    ], putMaestros
);

router.delete(
    "/:id",
    [
        validarJWT,
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeMaestroById),
        validarCampos
    ], maestrosDelete
);

module.exports = router;


