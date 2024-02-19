const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {
    maestrosGet, 
    putMaestros,
    getMaestroById,
    maestrosPost,
    maestrosDelete
} = require('../controllers/maestro.controller');

const { existenteEmail, esRoleValido, existenteId } = require('../helpers/db-validator.js');
const { validarJWT } = require('../middlewares/validar-jwt.js');


const router = Router();

router.get('/', maestrosGet);

router.get(
    '/:id',
    [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existenteId),
        validarCampos
    ], getMaestroById
);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede quedar vacio").not().isEmpty(),
        check("password", "El password debe de ser mayor a 8 caracteres").isLength({ min: 8}),
        check("correo", "El grado no puede quedar vacio").isEmail(),
        check("correo").custom(existenteEmail),
        check("role").custom(esRoleValido),
        validarCampos
    ], maestrosPost
);

router.put(
    "/:id",
    [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existenteId),
        check('role').custom(esRoleValido),
        validarCampos
    ], putMaestros
);

router.delete(
    "/:id",
    [
        validarJWT,
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existenteId),
        validarCampos
    ], maestrosDelete
);

module.exports = router;


