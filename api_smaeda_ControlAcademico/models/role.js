const { Schema, model } = require('mongoose');

const RoleSchema = Schema ({
    role:{
        type: String,
        required: [true, 'El role tiene que ser Obligatorio']
    }
});

module.exports = model('Role', RoleSchema);