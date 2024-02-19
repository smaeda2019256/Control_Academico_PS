const { request } = require('express');
const Alumno = require('../models/alumno');
const Maestro = require('../models/maestro');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req = request, res = response) => {
    const { correo, password } = req.body;

    try{
        let user = await Alumno.findOne({ correo });

        if (!user) {
            user = await Maestro.findOne({ correo });

            if (!user) {
                return res.status(400).json({
                    msg: "Credenciales incorrectas, el correo no existe en la Base de Datos!"
                });
            }
        }

        if (!user.estado) {
            return res.status(400).json({
                msg: "El usuario no existe en la Base de Datos"
            });
        }

        const validarPassword = bcryptjs.compareSync(password, user.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg: "La contraseña es incorrecta"
            });
        }

        const token = await generarJWT(user.id);

        res.status(200).json({
            msg: "Bienvenido (LOGIN)",
            user,
            token
        });

    } catch(e) {
        console.log(e);
        res.status(500).json({
            msg: "Comuniquese con el Administrador"
        });
    };
};

module.exports = {
    login
}