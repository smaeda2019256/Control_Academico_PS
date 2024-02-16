const bcryptjs = require('bcryptjs');
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


module.exports = {
    maestrosGet,
    getMaestroById
}