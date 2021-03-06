import { Usuario } from '../models/usuario.js'; 
import { Grupo } from '../models/grupo.js';
import { Invitacion } from '../models/invitacion.js';
import { Roles } from '../models/rol.js';
import { Comentario } from '../models/comentario.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'



export async function getUsuario(req, res){
    
}

export async function crearUsuario(req, res){
    try{
        const { password, nickname } = req.body;
        let usuario = await Usuario.findOne({nickname})
        
        if (usuario){
            res.status(200).send({'msg':'El usuario ya existe'})
        }else{
            const { nickname, nombre, apellido , celular, password } = req.body;
            const usuario = new Usuario({nickname: nickname, nombre: nombre, apellido: apellido, celular: celular, password: password});
            const salt = await bcrypt.genSalt(10)
            usuario.password = await bcrypt.hash(password, salt)
            if(req.file){
                const {filename} = req.file
                usuario.setImgUrl(filename)
            }
            await usuario.save();
            res.status(200).send({'msg':'success'})
        }
    }catch(err){
        console.log(err)
        res.send({'msg':err})
    }
    
}

export async function verInvitaciones(req, res){  
    const retorno = []
    try{
        const { id_usuario } = req.body; 
        let usuario = await Usuario.findById({'_id': id_usuario})
        if(usuario){
            //Ahora hay que ver las invitaciones que tiene el usuario loggeado xd
            //Entonces voy a Invitaciones mmm
            let invitaciones = await Invitacion.find({ id_usuario_solicitado: usuario._id})
            if(!invitaciones){
                console.log("no hay invitaciones xd")
                return res.json({'msg': "No tenés invitaciones pa"})
            }else{
                //Si tiene invitaciones es porque tengo que retornarlas mmmmm
                for (const invitacion of invitaciones) {
                    //Si los id son iguales es porque el usuario loggeado es al que lo invitaron mmm
                    if(id_usuario == invitacion.id_usuario_solicitado){
                        //Retorno solamente las invitaciones que no aceptó el pibardo
                        if(invitacion.aceptado == false){
                            const usuInvi = await Usuario.findById({'_id': invitacion.id_usuario_solicitante})                          
                            const grupoInvi = await Grupo.findById({'_id': invitacion.id_grupo})

                            //Info a retornar
                            const idInvitacion = invitacion._id
                            const nombreGrupo = grupoInvi.nombre
                            const nicknameUsuario = usuInvi.nickname
                            const nombreUsuario = usuInvi.nombre
                            const apellidoUsuario = usuInvi.apellido

                            retorno.push({idInvitacion, nombreGrupo, nicknameUsuario, nombreUsuario, apellidoUsuario})     
                        }
                    }
                }
                return res.json({
                    'retorno': retorno
                })
            }
        }else{
            return res.json({'msg': "Ha ocurrido un error inesperado"})
        }
    }catch(err){
        console.log(err)
        return res.json({'msg':err})
    }
}

export async function aceptarInvitacion(req, res){
        const retorno = []
        const {id_invitacion, estado} = req.body
        var existe_error = null

        if(estado){
            //En caso de que el tipo acepte, tengo que cambiar el estado de la invi.           
            Invitacion.findByIdAndUpdate(id_invitacion, {'aceptado': true}, (error, data) => {               
                if(error){
                    existe_error = error
                    return res.json({error})
                }                         
            })                         
        }else{
            //En caso de que el tipo la rechace, borro la invi y el rol.
            const invitacion = await Invitacion.findById({'_id': id_invitacion})
            const id_rol = invitacion.id_rol

            Invitacion.findByIdAndRemove(id_invitacion, function (err, docs) {
                if (err){
                    return res.json({error})
                }
                else{
                    console.log("Removed invitacion : ", docs);
                }
            });

            Roles.findByIdAndRemove(id_rol, function (err, docs) {
                if (err){
                    return res.json({error})
                }
                else{
                    console.log("Removed rol : ", docs);
                }
            });

            return res.json({
                msg: "Se rechazó correctamente"
            })

        }

        if(existe_error == null){
            //Si no hay error
            const invitacion = await Invitacion.findById({'_id': id_invitacion})

            const id_rol = invitacion.id_rol
            const rol = await Roles.findById({'_id': id_rol})

            const {usuario_id} = rol
            const id_grupo = rol.grupo_id

            const grupo = await Grupo.findById({'_id': id_grupo})
            const comentariosNuevos = await getComentariosNuevos(usuario_id, id_grupo)
            const comentariosLeidos = await getComentariosLeidos(usuario_id, id_grupo)
         
            return res.json({
                data: "Se ha creado el grupo correctamente",
                info_grupo: {grupo: grupo, comentariosNuevos: comentariosNuevos, comentariosLeidos: comentariosLeidos}
            })
        }

}

export async function actualizarUsuario(req, res){
    
}

export async function eliminarUsuario(req, res){
    
}

export async function autenticarUsuario(req, res){
    
    const { nickname , pass } = req.body
    console.log(pass)

    try {
        let usuario = await Usuario.findOne({nickname})

        if(!usuario){
            return res.json({'msg': 'El usuario no existe'})
        }

        const passCorrecto = await bcrypt.compare(pass, usuario.password)
        if(!passCorrecto){
            return res.json({'msg': 'Contraseña incorrecta'})
        }

        const grupos = await Grupo.find({usuario_id:usuario.id})
        //console.log(grupos)
        //TOKEN
        const payload = {
            usuario: {
                id: usuario.id,
                grupos
            }
        };

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 * 6 //DURACIÓN : 6 HORAS
        }, (error, token) => {
            if(error) throw error;
            
            return res.json({'msg':token})
        })

    
    }catch(err){
        console.log({data: err})
    }
}

export async function informacionUsuario(req, res){
    const { id_usu } = req.body
    Usuario.findById(id_usu, (error, usuario) => {
        if(error){
            console.log(error)
        }else{
            return res.json({usuario})
        }
        
    });
}

export async function ingresarSocket(req, res){
    try{
        const {usuario_id, socket_id} = req.body
        //Usuario.updateOne({_id: usuario_id}, {'$set': {'socket_id':socket}})
        console.log("Usuario id:" + usuario_id)
        Usuario.findByIdAndUpdate(usuario_id,{'socket_id':socket_id}, (error, data) => {
            if(error){
                return res.json(error)
            }
            else{
                return res.json(data)
            }
        })
        
        //return res.json({'msg':'success'})
    }catch(err){
        console.log(err)
    }
    

}

ingresarSocket

//RANCIADA ABAJO
export function getData(req, res){
    Usuario.find({
        //  QUERY
    }, (err, docs) => {
        res.send({
            docs
        })
    })
}

export function insertData(req, res){
    const data = req.body
    Usuario.create(data, (err, docs) => {
        if(err){
            console.log('Error', err)
            res.status(422).send({error: 'Error'})
        }else{
            console.log(docs)
            res.status(200).send({state: 'success'})
        }
        
    })
}

async function getComentariosNuevos(idUsuario, idGrupo){

    const comentarios_nuevos = Comentario.find({"grupo_id": idGrupo, "usuarios_visto": {'$nin': [idUsuario]}})
    return comentarios_nuevos

}

async function getComentariosLeidos(idUsuario, idGrupo){

    const comentarios_leidos = Comentario.find({"grupo_id": idGrupo, "usuarios_visto": {'$in': [idUsuario]}})
    return comentarios_leidos

}

export async function cerrarsesion(req, res){
    //jwtr.destroy(token)
}