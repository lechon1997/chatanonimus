import { Usuario } from '../models/usuario.js'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export async function getUsuarios(req, res){
    res.send({data: "xDDD"})
    console.log("xDDD2")

}

export async function getUsuario(req, res){
    
}

export async function crearUsuario(req, res){
    
}

export async function actualizarUsuario(req, res){
    
}

export async function eliminarUsuario(req, res){
    
}

export async function autenticarUsuario(req, res){
    
    const { nickname , pass } = req.body
    
    try {
        let usuario = await Usuario.findOne(nickname)
        if (usuario){
            res.status(200).send({'msg': 'success'})
        }else{
            res.status(200).send({'msg': 'El usuario no existe'})
        }
    }catch(err){
        res.send({data: err})
    }
    
    const salt = await bcrypt.genSalt(10)
    const hash = bcrypt.hash(pass, salt)
    res.send({data: req.body})
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
            res.status(200).send({state: 'success'})
        }
        
    })
}