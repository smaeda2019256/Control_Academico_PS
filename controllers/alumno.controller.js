const bcrypt = require('bcrypt');
const Alumno = require('../models/alumno');
const { response , json } = require('express');

const alumnosGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, alumnos] = await Promise.all([
        Alumno.countDocuments(query),
        Alumno.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        alumnos
    });
}

const getAlumnoByid = async (req, res) => {
    const { id } = req.params;
    const alumno = await Alumno.findOne({_id: id});

    res.status(200).json({
        alumno
    });
}

const putAlumnos = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, correo, ...resto } = req.body;

    if (password) {
        const salt = bcryptsjs.genSaltSync();
        resto.password = bcryptsjs.hashSync(password, salt);
    }

    const alumno = await Alumno.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'El Alumno Fue Actualizado Exitosamente!',
        alumno,
    });
}

const alumnosDelete = async (req, res) => {
    const {id} = req.params;
    const alumno = await Alumno.findByIdAndUpdate(id, {estado: false});
    const alumnoAutenticado = req.alumno;

    res.status(200).json({
        msg: 'Alumno que se Eliminara',
        alumno,
        alumnoAutenticado
    });
}

const alumnosPost = async (req, res) => {
    try{
        const {nombre, correo, password } = req.body;
        const hashedPassword = await  bcrypt.hash(password, 10);
        const alumno = new Alumno ({nombre, correo, password: hashedPassword});
        await alumno.save();
        
        res.status(200).json({
            msg: 'El Alumno fue AGREGADO Correctamente',
            alumno
        });
        }catch(error){
            res.status(409).json({
                error: error.message
            });
    }
}

module.exports = {
    alumnosGet,
    getAlumnoByid,
    putAlumnos,
    alumnosDelete,
    alumnosPost

}