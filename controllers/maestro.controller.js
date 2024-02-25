const bcrypt = require('bcrypt');
const Maestro = require('../models/maestro');
const { response, request } = require('express');
const { existeEmailMaestro } = require('../helpers/db-validator');

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
        msg: "El Maestro fue Encontrado",
        maestro
    });
}

const maestrosPost = async (req, res) => {
    try{
        const { nombre, correo, password } = req.body;
        await existeEmailMaestro(correo);
        const hashedPassword = await bcrypt.hash(password, 10);
        const maestro = new Maestro({nombre, correo, password: hashedPassword});

        await maestro.save();
        res.status(200).json({
            msg: "El Maestro se AGREGÓ Correctamente",
            maestro
        });

    }catch (e){
        res.status(409).json({
            error: error.message
        });
    }
    
}

const putMaestros = async (req, res = response) => {
    const {id} = req.params;
    const {_id, password, correo, ...resto} = req.body;

    await Maestro.findByIdAndUpdate(id, resto);
    const maestro = await Maestro.findOne({_id: id});

    res.status(200).json({
        msg: "El Maestro se ACTUALIZÓ Correctamente",
        maestro
    });
}

const maestrosDelete = async (req, res) =>{
    try{
        const {id} = req.params;
        const maestro = await Maestro.findByIdAndUpdate(id,{estado: false});
        const maestroAutenticado = req.alumno;

        res.status(200).json({
            msg: "Él Maestro que se ELIMINARÁ",
            maestro,
            maestroAutenticado
        });

    }catch(e){
        res.status(500).json({
            msg: "Él Maestro no se pudo ELIMINAR"
        });
    }
    
}


module.exports = {
    maestrosGet,
    getMaestroById,
    maestrosPost,
    putMaestros,
    maestrosDelete
}