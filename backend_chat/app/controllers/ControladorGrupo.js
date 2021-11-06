import { Grupo } from '../models/grupo.js';

export async function getGrupos(req, res){
    const { id_usu } = req.body
    const grupos = await Grupo.find({"usuario_id":id_usu })
    return res.json({grupos})

}

export async function getGrupo(req, res){
    
}

export async function crearGrupo(req, res){
    const { nombreGrupo, descripcionGrupo, id_usuario } = req.body;
    console.log(nombreGrupo+" "+descripcionGrupo+" "+id_usuario+" "+req.file);
    console.log(req.body);
    try{
        const grupo = new Grupo({usuario_id: id_usuario, nombre: nombreGrupo, descripcion: descripcionGrupo});
        if(req.file){
            const {filename} = req.file
            grupo.setImgUrl(filename)
        }
        await grupo.save();
        res.send({
            data: "Se ha creado el grupo correctamente",
            grupo
        })

    }catch(error){
        res.send({data: error})
        console.log(error)     
    }
}

export async function actualizarGrupo(req, res){
    
}

export async function eliminarGrupo(req, res){
    
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