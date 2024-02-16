const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {
    maestrosGet,
} = require('../controllers/maestro.controller');

const router = Router();

router.get('/', maestrosGet);

router.get(
    '/:id',
    [
        check('id', 'No es un ID válido').isMongoId(),
        validarCampos
    ], getMaestroById
);