const bcryptsjs = require('bcryptjs');
const Maestro = require('../models/maestro');
const { response, request } = require('express');

const maestrosGet = async (req, res = response) =>{
    const {limite, desde } = req.query;
    const query = {estado: true};

    const [total, maestros ] = await Promise.all([
        Maestro.countDocuments(query),
        Maestro.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        maestros
    });
}

const getMaestroById = async (req, res) => {
    const { id } = req.params;
    const maestro = await Maestro.findOne({_id: id});

    res.status(200).json({
        maestro
    });
}

const maestrosPost = async (req, res) => {
    const { nombre, correo, password } = req.body;
    const maestro = new Maestro({ nombre, correo, password });

    const salt = bcryptsjs.genSaltSync();
    maestro.password = bcryptsjs.hashSync(password, salt);

    await maestro.save();
    res.status(200).json({
        maestro
    });
}

const putMaestros = async (req, res = response) => {
    const {id} = req.params;
    const {_id, password, curso, correo, ...resto} = req.body;

    if (password) {
        const salt = bcryptsjs.genSaltSync();
        resto.password = bcryptsjs.hashSync(password, salt);
    }

    const maestro = await Maestro.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'El Maestro a sido Actualizado Exitosamente',
        maestro
    });
}


module.exports = {
    maestrosGet,
    getMaestroById,
    maestrosPost,
    putMaestros
}