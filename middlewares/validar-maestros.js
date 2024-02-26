const validarMaestro = (req, res, next) => {
    try {
        const {maestro} = req;

        if (!maestro){
            return res.status(403).json({
                msg: "ACCESO DENEGADO - Solo MAESTROS pueden realizar esta acción"
            });

        }
        next();

    }catch(e){
        console.log(error);
        return res.status(500).json({
            msg: "Hubo un ERROR en la validación del Maestro",
            error: error.message
        });
    }
};

module.exports = validarMaestro;