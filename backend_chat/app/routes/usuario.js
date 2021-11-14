import { Router } from "express";
import { getUsuario, crearUsuario, actualizarUsuario, autenticarUsuario,eliminarUsuario, informacionUsuario, ingresarSocket} from '../controllers/ControladorUsuario.js';
import {upload} from "../../libs/storage_usuarios.js";
const routerUsuario = Router()

routerUsuario.get('/',(req, res)=>{
    res.send('Hello World!')
})
//routerUsuario.get('/:id',getUsuario)
routerUsuario.post('/crearUsuario', upload.single('foto'),crearUsuario)
routerUsuario.post('/',informacionUsuario)
//routerUsuario.patch('/:id',actualizarUsuario)
//routerUsuario.delete('/:id',eliminarUsuario)
routerUsuario.post('/auth',autenticarUsuario)
routerUsuario.post('/setSocket',ingresarSocket)

export default routerUsuario