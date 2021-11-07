import mongoose from "mongoose";

const ComentarioSchema = new mongoose.Schema({
    usuario_id:{
        type: String,
        required: true
    },
    grupo_id:{
        type: String,
        required: true
    },
    asunto:{
        type: String,
        required: true
    },
    mensaje:{
        type: String
    },
    anonimo: {
        type: Boolean
    },
    respuestas: [],
    usuarios_visto: []
    

},{
    versionKey:false,
    timestamps:true
})

export const Comentario = mongoose.model('comentario', ComentarioSchema)