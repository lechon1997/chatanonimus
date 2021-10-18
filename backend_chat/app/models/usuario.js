import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
    nombre:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String
    }
},{
    versionKey:false,
    timestamps:true
})

export const Usuario = mongoose.model('usuarios', UsuarioSchema)