import { Router } from "express";
import { getUsuarios, getUsuario, crearUsuario, actualizarUsuario, autenticarUsuario,eliminarUsuario} from '../controllers/ControladorUsuario.js';

const routerUsuario = Router()

routerUsuario.post('/',getUsuarios)
routerUsuario.get('/:id',getUsuario)
routerUsuario.post('/',crearUsuario)
routerUsuario.patch('/:id',actualizarUsuario)
routerUsuario.delete('/:id',eliminarUsuario)
routerUsuario.post('/auth',autenticarUsuario)

export default routerUsuario