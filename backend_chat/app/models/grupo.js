import mongoose from "mongoose";

const GrupoSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    descripcion:{
        type: String
    },
    foto:{
        type: String
    }

},{
    versionKey:false,
    timestamps:true
})

export const Grupo = mongoose.model('grupos', GrupoSchema)