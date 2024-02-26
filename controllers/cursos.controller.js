const {response, json} = require('express');
const Curso = require('../models/curso');
const Alumno = require('../models/alumno');
const Maestro = require('../models/maestro');

const cursosGet = async (req, res = response) =>{
    const {limite, desde} = req.query;
    const query = {estado: 'HABILITADO'};
    const [total, cursos] = await Promise.all([

        Curso.countDocuments(query),
        Curso.find(query)
            .populate('maestro', 'nombre de correo')
            .skip (Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        cursos
    });
};

const cursosPost = async (req, res) => {
    try {
        const {nombre, descripcion, acceso} = req.body;
        const maestro = req.maestro._id;
        const curso = new Curso({nombre, descripcion, acceso, maestro});
        await curso.save();

        res.status(200).json({
            msg: "El Curso se AGREGÓ Correctamente",
            curso
        });

    }catch(error){
        res.status(409).json({
            error: error.message
        });
    }
};

const cursosPut =  async (req, res) => {
    try{
        const  { id }= req.params;
        const  {maestro: maestroAutenticado} = req;
        const {_id, acceso, maestro, ...resto} = req.body;
        const curso = await Curso.findById(id);

        if (!curso || String(curso.maestro) !== String(maestroAutenticado._id)) {
            return res.status(403).json({
                msg: 'ACCESO DENEGADO - Solo el Maestro del Curso puede Actualizarlo'
            });
        }

        const cursoActualizado = await Curso.findByIdAndUpdate(id, resto, {new: true});

        await Alumno.updateMany(
            {cursos: {$in: [cursoActualizado._id]}},
            {$et: {"cursos.$": cursoActualizado._id}}
        );

        res.status(200).json({
            msg: 'El Curso fue ACTUALIZADO Correctamente',
            curso: cursoActualizado
        });

    }catch(error){
        res.status(500).json({
            msg: 'Hubo un ERROR al poder ACTUALIZAR el Curso',
            error: error.message
        });
    }
};

const cursosDelete = async (req, res) => {
    try{
        const  { id } = req.params;
        const {maestro} = req;
        const curso = await Curso.findById(id);

        if (!curso || curso.maestro.toString() !== maestro._id.toString()) {
            return res.status(403).json({
                msg: 'ACCESO DENEGADO - Solo el Maestro del Curso puede Eliminarlo'
            });
        }

        await Alumno.updateMany(
            {cursos: curso._id},
            {$pull: {cursos: curso._id}}
        );

        await Curso.findByIdAndUpdate(id, {estado: false});

        res.status(200).json({
            msg: 'El Curso fue ELIMINADO Correctamente'
        });

    }catch(error){
        res.status(500).json({
            msg: 'Hubo un ERROR al quere ELIMINAR el Curso',
            error: error.message
        });
    }
};

const cursosGetMaestro = async (req, res) => {
    try{
        const maestroID = req.maestro._id;
        const cursos = await Curso.find({maestro: maestroID});

        res.status(200).json({
            total: cursos.lenght,
            cursos
        });

    }catch(error){
        res.status(500).json({
            msg: 'Hubo un ERROR al poder Obtener los Cursos del Maestro',
            error: error.message
        });
    }
};

module.exports = {
    cursosGet,
    cursosPost,
    cursosPut,
    cursosDelete,
    cursosGetMaestro
}