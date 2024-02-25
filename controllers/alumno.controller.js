const bcrypt = require('bcrypt');
const Alumno = require('../models/alumno');
const { response , json } = require('express');

const putAlumnos = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, correo, ...resto } = req.body;

    await Alumno.findByIdAndUpdate(id, resto)

    const alumno = await Alumno.findOne({_id: id});

    res.status(200).json({
        msg: 'El Alumno Fue ACTUALIZADO Correctamente!',
        alumno,
    });
}

const alumnosDelete = async (req, res) => {
    try{
        const  { id } = req.params;

        const alumno = await Alumno.findByIdAndUpdate(id, {estado: false});
        res.status(200).json({
            msg: "El Alumno fue ELIMINADO Correctamente",
            alumno
        });

    }catch (error) {
        res.status(500).json({
            msg: "El Alumno no se pudo ELIMINAR"
        });
    }
}

const agregarCursoAlumno = async  (req,res=response)=>{
    try{
        const { curso } = req;
        const alumno = req.alumno;

        alumno.cursos.push(curso._id);
        await alumno.save();

        res.status(200).json({
            msg: 'El Curso se AGREGÓ Correctamente al Alumno',
            alumno
        });

    }catch (error) {
        res.status(500).json({
            msg: 'Ocurrió un ERROR al AGREGAR el Curso al Alumno',
            error: error.message
        });
    }
}

const getCursoAlumnoByToken = async (req, res) => {
    try {
        const alumno = req.alumno;
        const cursos = await Curso.find({_id: {$in: alumno.cursos }});
        const cursosWithNombre = cursos.map(curso => ({
            _id: curso._id,
            nombre: curso.nombre,
            descripcion: curso.descripcion,
            profesor: curso.profesor
        }));

        res.status(200).json({
            cursos: cursosWithNombre
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Ocurrió un ERROR para obtener los Cursos del Alumno',
            error: error.message
        });
    }
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
    putAlumnos,
    alumnosDelete,
    agregarCursoAlumno,
    getCursoAlumnoByToken,
    alumnosPost

}