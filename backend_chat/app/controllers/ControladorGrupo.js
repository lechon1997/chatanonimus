import { Grupo } from '../models/grupo.js';
import { Comentario } from '../models/comentario.js';
import { Roles } from '../models/rol.js';
import { Usuario } from '../models/usuario.js'; 
import { Invitacion } from '../models/invitacion.js'; 
import { Respuestas } from '../models/respuesta.js';

async function getComentariosNuevos(idUsuario, idGrupo){

    const comentarios_nuevos = Comentario.find({"grupo_id": idGrupo, "usuarios_visto": {'$nin': [idUsuario]}})
    return comentarios_nuevos

}

async function getComentariosLeidos(idUsuario, idGrupo){

    const comentarios_leidos = Comentario.find({"grupo_id": idGrupo, "usuarios_visto": {'$in': [idUsuario]}})
    return comentarios_leidos

}

export async function mensajeVisto( req, res){
    const { idmensaje, idusuario } = req.body
    const comentario = await Comentario.findById(idmensaje)
    
    if(comentario.usuarios_visto.indexOf(idusuario) == -1){
        await Comentario.findOneAndUpdate({'_id': idmensaje}, {'$push': {'usuarios_visto': idusuario}})
        Comentario.save()
        
    }
        
}


export async function guardarRespuesta(req, res){
    const { nick_usuario, texto_respuesta, id_comentario } = req.body
    try{
        
        const respuesta = new Respuestas({texto:texto_respuesta, nombreUsuario: nick_usuario})
        await respuesta.save()
        await Comentario.findOneAndUpdate({'_id':id_comentario}, {'$push': {'respuestas': respuesta}})
        res.send({'msg':'success',
                  'respuesta': respuesta})
    }catch(err){
        console.log(err)
    }
}


export async function getGrupos(req, res){
    const { id_usu } = req.body
    const grupos = await Roles.find({"usuario_id":id_usu })
    var datos_grupos = []

    for (const grupo of grupos) {
        const res = await Grupo.findById(grupo.grupo_id)
        const usuario_creador = res.usuario_id

        //Si el usuario creó al grupo lo agrego
        if(usuario_creador == id_usu){
            const comxd = await getComentariosNuevos(id_usu, grupo.grupo_id)
            const comxd2 = await getComentariosLeidos(id_usu, grupo.grupo_id)
            //console.log(comxd)
            datos_grupos.push({grupo:res, comentariosNuevos: comxd, comentariosLeidos: comxd2})
        }    
    }
            
    //Si aceptó la solicitud ahí también hay que agregarlo
    const invitaciones = await Invitacion.find({ id_usuario_solicitado: id_usu})
    if(invitaciones){
        for (const invitacion of invitaciones) {
            if(id_usu == invitacion.id_usuario_solicitado){
                if(invitacion.aceptado == true){
                    const grupoInvi = await Grupo.findOne({usuario_id: invitacion.id_usuario_solicitante})
                    const comxd = await getComentariosNuevos(id_usu, grupoInvi._id)
                    const comxd2 = await getComentariosLeidos(id_usu, grupoInvi._id)
                    //console.log(comxd)
                    datos_grupos.push({grupo:grupoInvi, comentariosNuevos: comxd, comentariosLeidos: comxd2})
                }
            }
        }
    }

    //console.log(datos_grupos)
    //console.log(datos_grupos)
    return res.json({grupos: datos_grupos})

}

export async function getGrupo(req, res){
    const { grupo_id } = req.body;
    
    try{

        const grupo = await Grupo.findById(grupo_id.id_g)
        let miembros = await Roles.find({grupo_id: grupo_id.id_g })
        
        let datos_miembros = []
        for (const miembro of miembros) {
            const usu = await Usuario.findById(miembro.usuario_id)

            const datos = []
            if(miembro.admin == true){
                datos.push({nickname: usu.nickname, rol: miembro.nombre, admin: "Administrador"})
            }else{
                datos.push({nickname: usu.nickname, rol: miembro.nombre, admin: ""})
            }
            
            datos_miembros.push(datos)

        }
        return res.json({info_grupo: grupo, miembros: datos_miembros})

    }catch(err){
        return res.json({'msg':err});
    }
}

export async function crearGrupo(req, res){
    const { nombreGrupo, descripcionGrupo, id_usuario } = req.body;

    try{
        const grupo = new Grupo({usuario_id: id_usuario, nombre: nombreGrupo, descripcion: descripcionGrupo});
        if(req.file){
            const {filename} = req.file
            grupo.setImgUrl(filename)
        }
        await grupo.save();

        const rol = new Roles({usuario_id: id_usuario, grupo_id: grupo._id, nombre:'Super administrador', admin:false,superAdmin:true})
        await rol.save();
        res.send({
            data: "Se ha creado el grupo correctamente",
            grupo
        })

    }catch(error){
        res.send({data: error})
        console.log(error)     
    }
}

export async function agregarMiembro(req, res){
    const { usuario_id, grupo_id, nickname, rol, esadmin } = req.body;
    //console.log(usuario_id + " " + grupo_id + " " + nickname + " " + rol + " " + esadmin)
    
    try{
        //El usuario que recibe la invitación supuestamente xd
        let usuarioSolicitado = await Usuario.findOne({nickname});
      
        if(!usuarioSolicitado){
            return res.json({'msg': 'El usuario no existe'})       
        }else{           
            //Me fijo si no me invité a mi mismo-------------------------//            
            if(usuarioSolicitado._id == usuario_id){
                return res.json({'msg': 'Te estás invitando a vos mismo bananín'})
            }
            //-------------------------------------------------------------------//

            //También me fijo si el usuario ya está invitado (o sea si ya tiene un rol en ese grupo).
            let usuarioInvitadoAGrupo = await Roles.findOne(
                { usuario_id: usuarioSolicitado.id,
                grupo_id: grupo_id }
            )

            //Si está invitado muestro un mensaje acorde.
            if(usuarioInvitadoAGrupo){
                return res.json({'msg': 'El usuario ya está invitado'})
            }else{
                //De lo contrario creo el rol y la invitación.
                //Creo el rol            
                const rol_rancio = new Roles({usuario_id: usuarioSolicitado.id, grupo_id: grupo_id, nombre: rol, admin: esadmin, superAdmin:false});
                await rol_rancio.save();

                //Creo la invitación
                const invitacion = new Invitacion({id_usuario_solicitante: usuario_id, id_usuario_solicitado: usuarioSolicitado.id, id_rol: rol_rancio.id,
                    aceptado: false, id_grupo: grupo_id})
                await invitacion.save();

                //Y si la invitación fue creada con éxito ahí si, envió el mensaje.
                if(invitacion){
                    return res.json({'msg': 'La invitación fue enviada con éxito'}) 
                }else{
                    return res.json({'msg': 'No se pudo enviar la invitación'}) 
                }
            }           
        }
    }catch(err){
        return res.json({'msg':err});
    }

}

export async function actualizarGrupo(req, res){
    
}

export async function eliminarGrupo(req, res){
    
}

export async function nuevo_comentario(req, res){
    try{
        const { usuario_id, grupo_id } = req.body
        const comentario = new Comentario(req.body);
        await comentario.save();

        const usuarios_del_grupo = await Roles.find({ grupo_id })
        //console.log(usuarios_del_grupo)
        return res.json({
            'msg':'success',
            'data': usuarios_del_grupo
        })
    }catch(err){
        console.log(err)
        return res.json({'msg':'error'})
    }
    
}


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
            res.status(200).send({data: 'Ingresado correctamente'})
        }
        
    })
}