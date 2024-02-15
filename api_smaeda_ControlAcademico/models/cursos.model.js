const mongoose = require('mongoose');

const cursosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    maestro: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'
    }
});

module.exports = mongoose.model('Cursos', cursosSchema);