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
    
    try{
        const { password, nickname } = req.body;
        let usuario = await Usuario.findOne({nickname})
        
        if (usuario){
            res.status(200).send({'msg':'El usuario ya existe'})
        }else{
            const usuario = new Usuario(req.body);
            const salt = await bcrypt.genSalt(10)
            usuario.password = await bcrypt.hash(password, salt)
            await usuario.save();
            res.status(200).send({'msg':'success'})
        }
    }catch(err){
        console.log(err)
        res.send({'msg':err})
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

        //TOKEN
        const payload = {
            usuario: {
                id: usuario.id
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