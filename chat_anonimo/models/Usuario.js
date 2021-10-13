const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    usuario:{
        type: String,
        required: [true, 'El campo usuario no es opcional'],
        unique: true,
        maxlength: [50, 'El nombre de usuario no debe de tener más de 50 caracteres.']
    },
    password:{
        type: String,
        required: [true, 'El campo contraseña no es opcional'],
        maxlength: [50, 'La contraseña no debe de tener más de 50 caracteres.']
    }
})

module.exports = mongoose.model.Usuario || mongoose.model('Usuario', UsuarioSchema)