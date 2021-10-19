import { Grupo } from '../models/grupo.js'; 

export async function getGrupos(req, res){
    res.send({data: "xDDD"})
    console.log("xDDD2")
}

export async function getGrupo(req, res){
    
}

export async function crearGrupo(req, res){
    const nombreGrupo = req.query["nombreGrupo"];
    const descripcionGrupo = req.query["descripcionGrupo"];
    const fotoGrupo = req.query["fotoGrupo"];

    
   
    res.send({nombreGrupo, descripcionGrupo, fotoGrupo})
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