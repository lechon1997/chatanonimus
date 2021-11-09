import { Grupo } from '../models/grupo.js';
import { Comentario } from '../models/comentario.js';
import { Roles } from '../models/rol.js';

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
    
    const { grupo_id } = req.body

    const grupo = await Grupo.findById(grupo_id.id_g)
    
    return res.json({info_grupo: grupo})
}

export async function crearGrupo(req, res){
    const { nombreGrupo, descripcionGrupo, id_usuario } = req.body;
    
    console.log(req.body);
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
        res.send({data: "xd"+error})
        console.log(error)     
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