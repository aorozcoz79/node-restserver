const jwt = require('jsonwebtoken')

// ===================================
//  VERIFICAR TOKEN 
// ===================================

let verificaToken = (req, res, next) => {

    let token = req.get('token')

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            })
        }

        req.usuario = decoded.usuario
        next()
    })

}

// ===================================
//  VERIFICAR ADMIN_ROLE 
// ===================================

let verificaAdminRole = (req, res, next) => {

    let usuario = req.usuario
    console.log(usuario.role);
    if (usuario.role === 'ADMIN_ROLE') {
        next()
    } else {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'Usuario no tiene privilegios'
            }
        })
    }


}

module.exports = {
    verificaToken,
    verificaAdminRole
}