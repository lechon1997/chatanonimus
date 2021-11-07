import mongoose from "mongoose";

const RolSchema = new mongoose.Schema({
    usuario_id:{
        type: String,
        required: true
    },
    grupo_id:{
        type: String,
        required: true
    },
    nombre:{
        type: String,
        required: true

    },
    admin:{
        type: Boolean,
        required: true
    },
    superAdmin:{
        type: Boolean,
        required: true
    }

},{
    versionKey:false,
    timestamps:true
})

export const Roles = mongoose.model('roles', RolSchema)