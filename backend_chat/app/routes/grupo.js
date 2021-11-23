import { Router } from "express";
import { getGrupos, getGrupo, crearGrupo, nuevo_comentario, agregarMiembro, mensajeVisto,eliminarGrupo, guardarRespuesta} from '../controllers/ControladorGrupo.js';
import {upload} from "../../libs/storage.js";

const routerGrupo = Router()

routerGrupo.post('/',getGrupos)
routerGrupo.post('/getGrupo',getGrupo)
routerGrupo.post('/crearGrupo', upload.single('foto'), crearGrupo)
routerGrupo.post('/nuevoComentario', nuevo_comentario)
routerGrupo.post('/agregarMiembro', agregarMiembro)
routerGrupo.post('/tevi', mensajeVisto)
routerGrupo.post('/guardarRespuesta', guardarRespuesta)


//routerGrupo.patch('/:id',actualizarGrupo)
//routerGrupo.delete('/:id',eliminarGrupo)

export default routerGrupo