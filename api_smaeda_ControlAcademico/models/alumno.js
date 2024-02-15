const { Schema, model } = require('mongoose');

const AlumnoSchema = Schema ({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    role:{
        type: String,
        default: "STUDENT_ROLE"
    },
    grado:{
        type: String,
        require: [true, 'El grado es obligatorio']
    },
    cursos:{
        type: [String],
        default: []
    },
    estado:{
        type: Boolean,
        default: true
    }
});

AlumnoSchema.methods.toJSON = function(){
    const{__v, password, _id, ...alumno} = this.toObject();
    alumno.uid = _id;
    return alumno;
};

module.exports =  model('Alumno', AlumnoSchema);