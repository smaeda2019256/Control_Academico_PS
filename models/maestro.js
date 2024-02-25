const {Schema, model} = require('mongoose');

const MaestroSchema = Schema({
    nombre:{
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    role:{
        type: String,
        enum: ["TEACHER_ROLE", "STUDENT_ROLE"], 
        default: "TEACHER_ROLE"
    },
    estado:{
        type: Boolean,
        default: true
    }

});

MaestroSchema.methods.toJSON = function(){
    const{__v, password, _id, ...maestro} = this.toObject();
    maestro.uid = _id;
    return maestro;
}

module.exports = model('Maestro', MaestroSchema);