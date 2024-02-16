const jwt = require('jsonwebtoken');

const generarJWT = (vid = '') => {
    return new Promise({resolve, reject} = {
        const: payload = { uid },
        jwt:sing(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '1h'
            },
            (err,token)=>{
                err ? (console.log(err).reject('No se puede generar el Token')): resolve(token);
            }
        )
    });
}

module.exports = {
    generarJWT
}