import mongoose from "mongoose";

const RespuestaSchema = new mongoose.Schema({
    nombreUsuario:{
        type: String,
        required: true
    },
    texto:{
        type: String,
        required: true
    }

},{
    versionKey:false,
    timestamps:true
})

export const Respuestas = mongoose.model('respuestas', RespuestaSchema)