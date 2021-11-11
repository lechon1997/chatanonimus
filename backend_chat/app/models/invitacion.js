import mongoose from "mongoose";
const InvitacionSchema = new mongoose.Schema({
    id_usuario_solicitante:{
        type: String,
        required: true
    },
    id_usuario_solicitado:{
        type: String,
        required: true
    },
    id_rol:{
        type: String,
        required: true
    },
    aceptado:{
        type: Boolean,
        required: true
    },
    id_grupo:{
        type: String,
        required: true
    }
},{
    versionKey:false,
    timestamps:true
})

export const Invitacion = mongoose.model('invitaciones', InvitacionSchema)