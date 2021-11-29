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
        type: String
    },
    mensaje:{
        type: String
    },
    anonimo: {
        type: Boolean,
        default: true
    },
    id_comentario_padre:{
        type: String,
        default: null

    },nombreUsuario:{
        type: String,
        default: null
        
    },
    respuestas: [],
    usuarios_visto: []
    

},{
    versionKey:false,
    timestamps:true
})

export const Comentario = mongoose.model('comentario', ComentarioSchema)