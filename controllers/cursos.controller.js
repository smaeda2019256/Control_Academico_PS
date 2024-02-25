const {response, json} = require('express');
const Curso = require('../models/curso');
const Alumno = require('../models/alumno');
const Profesor = require('../models/maestro');

const cursosGet = async (req, res = response) =>{
    const {limite, desde} = req.query;
    const query = {estado: 'HABILITADO'};
    const [total, cursos] = await Promise.all([

        Curso.countDocuments(query),
        Curso.find(query)
            .populate('Maestro', 'Nombre de Correo')
            .skip (Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        cursos
    });
}

module.exports = {
    cursosGet
}