const {Schema, model} = require('mongoose');

const CursoSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    acceso: {
        type: String,
        required: [true, 'El código de acceso es obligatorio']
    },
    profesor: {
        type: Schema.Types.ObjectId,
        ref: 'Profesor',
        required: [true, 'El profesor es obligatorio']
    },
    estado: {
        type: String,
        default: 'HABILITADO'
    }
});

module.exports = model('Curso', CursoSchema);