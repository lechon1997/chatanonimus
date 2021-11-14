import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
    nickname:{
        type: String,
        unique: true,
        required: true
    },
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    celular:{
        type: String
    },
    foto:{
        type: String
    },
    password:{
        type: String,
        required: true
    },
    socket_id:{
        type: String
    }
},{
    versionKey:false,
    timestamps:true
})

UsuarioSchema.methods.setImgUrl = function setImgUrl(filename){
    this.foto = filename;
}

export const Usuario = mongoose.model('usuarios', UsuarioSchema)