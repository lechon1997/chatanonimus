import { Router } from "express";
import { getGrupos, getGrupo, crearGrupo, actualizarGrupo, eliminarGrupo} from '../controllers/ControladorGrupo.js';

const routerGrupo = Router()

routerGrupo.post('/',getGrupos)
//routerGrupo.get('/:id',getGrupo)
routerGrupo.get('/crearGrupo', crearGrupo)
//routerGrupo.patch('/:id',actualizarGrupo)
//routerGrupo.delete('/:id',eliminarGrupo)

export default routerGrupo