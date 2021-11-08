import { Router } from "express";
import { getGrupos, getGrupo, crearGrupo, nuevo_comentario, agregarMiembro, eliminarGrupo} from '../controllers/ControladorGrupo.js';
import {upload} from "../../libs/storage.js";

const routerGrupo = Router()

routerGrupo.post('/',getGrupos)
//routerGrupo.get('/:id',getGrupo)
routerGrupo.post('/crearGrupo', upload.single('foto'), crearGrupo)
routerGrupo.post('/nuevoComentario', nuevo_comentario)
routerGrupo.post('/agregarMiembro', agregarMiembro)
//routerGrupo.patch('/:id',actualizarGrupo)
//routerGrupo.delete('/:id',eliminarGrupo)

export default routerGrupo