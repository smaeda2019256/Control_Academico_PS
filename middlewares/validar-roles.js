const { request, response } = require("express")

const tieneRole = (...roles) => {
    return (req= request, res = response, next ) => {
        if(!req.user){
            return res.status(500).json({
                msg: 'Se quiere certificar un ROLE sin antes validar el Token'
            })
        }

        if(!roles.includes(req.user)){
            return res.status(400).json({
                msg: `Se necesita un ROLE como los de ${roles}`
            })
        }
    }
}

module.exports = {
    tieneRole
}