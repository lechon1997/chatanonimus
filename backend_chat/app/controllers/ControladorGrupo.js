import { Grupo } from '../models/grupo.js'; 

export async function getGrupos(req, res){
    const { id_usu } = req.body
    const grupos = await Grupo.find({"usuario_id":id_usu })
    return res.json({grupos})

}

export async function getGrupo(req, res){
    
}

export async function crearGrupo(req, res){
    const id_usu = req.query["usuario_id"]
    const nombreGrupo = req.query["nombreGrupo"];
    const descripcionGrupo = req.query["descripcionGrupo"];
    const fotoGrupo = req.query["fotoGrupo"];

    try{
        const grupo = new Grupo({usuario_id: id_usu, nombre: nombreGrupo, descripcion: descripcionGrupo, foto: fotoGrupo});
        await grupo.save();
        res.send({
            data: "Se ha creado el grupo correctamente",
            grupo
        })

    }catch(error){
        res.send({data: "Ha ocurrido un error"})
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