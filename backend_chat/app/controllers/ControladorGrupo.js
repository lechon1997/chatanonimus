import { Grupo } from '../models/grupo.js';
import { Comentario } from '../models/comentario.js';
import { Roles } from '../models/rol.js';
import { Usuario } from '../models/usuario.js'; 
import { Invitacion } from '../models/invitacion.js'; 

export async function getGrupos(req, res){
    const { id_usu } = req.body
    console.log("----------------------------------")
    const grupos = await Roles.find({"usuario_id":id_usu })
    
    var datos_grupos = []

    for (const grupo of grupos) {
        const res = await Grupo.findById(grupo.grupo_id)
        datos_grupos.push(res)
      }

      console.log(datos_grupos)
    //console.log(datos_grupos)
    return res.json({grupos: datos_grupos})

}

export async function getGrupo(req, res){
    
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
            let usuarioInvitadoSoyYo = await Roles.findOne(
                { usuario_id: usuario_id,
                grupo_id: grupo_id }
            )

            if(usuarioInvitadoSoyYo){
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
                const invitacion = new Invitacion({id_usuario_solicitante: usuario_id, id_usuario_solicitado: usuarioSolicitado.id, id_rol: rol_rancio.id})
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
        //const comentario = new Comentario(req.body);
        //await comentario.save();

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