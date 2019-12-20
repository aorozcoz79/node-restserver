const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema

let categoriaSchema = new Schema({
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'El nombre es necesario']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El correo es necesario']
    }
})

// categoriaSchema.plugin(uniqueValidator, {
//     message: '{PATH} debe de ser único'
// })

module.exports = mongoose.model('Categoria', categoriaSchema)