import mongoose from "mongoose";

const GrupoSchema = new mongoose.Schema({
    usuario_id:{
        type: String,
        required: true
    },
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

GrupoSchema.methods.setImgUrl = function setImgUrl(filename){
    this.foto = filename;
}

export const Grupo = mongoose.model('grupos', GrupoSchema)