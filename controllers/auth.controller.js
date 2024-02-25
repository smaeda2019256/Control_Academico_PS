const { generarJWT } = require("../helpers/generar-jwt");
const Alumno = require('../models/alumnos');
const Maestro = require('../models/maestro');
const bcryptjs = require('bcryptjs');

const login = async (req, res) => {
    const { correo, password } = req.body;
    const alumno = await Alumno.findOne({ correo });
    const maestro = await Maestro.findOne({ correo });
    let user, userType;


    if (alumno) {
        user = alumno;
        userType = 'Alumno'
    } else {
        user = maestro;
        userType = 'Maestro';
    }
    
    try {

        if (!user) {
            return res.status(400).json({
                msg: 'El Correo No Está REGISTRADO'
            })
        }
        if (!user.estado) {
            return res.status(400).json({
                msg: 'El Usuario no EXISTE en la DB'
            })
        }
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'La Contraseña es INCORRECTA'
            })
        }

        const token = await generarJWT(user.id);

        res.status(200).json({
            msg: 'TOTAL ACCESO :)',
            user,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Porfavor, comuniquese con el ADMIN'
        })
    }

}

module.exports = {
    login
}