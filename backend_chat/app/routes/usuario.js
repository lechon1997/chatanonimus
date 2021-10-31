import { Router } from "express";
import { getUsuarios, getUsuario, crearUsuario, actualizarUsuario, autenticarUsuario,eliminarUsuario} from '../controllers/ControladorUsuario.js';

const routerUsuario = Router()

routerUsuario.post('/',getUsuarios)
routerUsuario.get('/',(req, res)=>{
    res.send('Hello World!')
})
//routerUsuario.get('/:id',getUsuario)
routerUsuario.post('/crearUsuario',crearUsuario)
//routerUsuario.patch('/:id',actualizarUsuario)
//routerUsuario.delete('/:id',eliminarUsuario)
routerUsuario.post('/auth',autenticarUsuario)

export default routerUsuario