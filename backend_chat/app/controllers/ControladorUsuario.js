import { Usuario } from '../models/usuario.js'; 

export async function getUsuarios(req, res){
    res.send({data: "xDDD"})
    console.log("xDDD2")

}

export async function getUsuario(req, res){
    
}

export async function crearUsuario(req, res){
    const nickname = req.query["nickname"];
    const nombre = req.query["nombre"];
    const apellido = req.query["apellido"];
    const celular = req.query["celular"];
    const foto = req.query["foto"];
    const password = req.query["password"];

    const usuario = new Usuario({nickname: nickname, nombre: nombre, apellido: apellido,celular: celular, foto: foto, password: password});
    usuario.save();

    res.send({nickname, nombre, apellido, celular, foto, password})
}

export async function actualizarUsuario(req, res){
    
}

export async function eliminarUsuario(req, res){
    
}

export async function autenticarUsuario(req, res){
    const dato = req.params.id
    res.send({data: dato})
    console.log("OK")
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