import { Router } from "express";
import { getUsuario, crearUsuario, actualizarUsuario, autenticarUsuario,eliminarUsuario, informacionUsuario, ingresarSocket, verInvitaciones, aceptarInvitacion} from '../controllers/ControladorUsuario.js';

const routerUsuario = Router()

routerUsuario.get('/',(req, res)=>{
    res.send('Hello World!')
})
//routerUsuario.get('/:id',getUsuario)
routerUsuario.post('/crearUsuario',crearUsuario)
routerUsuario.post('/',informacionUsuario)
//routerUsuario.patch('/:id',actualizarUsuario)
//routerUsuario.delete('/:id',eliminarUsuario)
routerUsuario.post('/auth',autenticarUsuario)
routerUsuario.post('/setSocket',ingresarSocket)
routerUsuario.post('/verInvitaciones', verInvitaciones)
routerUsuario.post('/aceptarInvitacion', aceptarInvitacion)

export default routerUsuario