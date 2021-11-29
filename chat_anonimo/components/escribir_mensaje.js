
import { types } from '../Usuario/usuarioReducer'
import { Usuario_Context } from '../Usuario/usuarioProvider'
import { UsuarioContext } from '../context/usuarioContext'
import { useContext } from 'react'

export default function Escribir_mensaje({respuestas, setNuevaRes, id_usuario,id_grupo, agregarMensajes,mensajes, idComentario,nickUsuario}){
    const url = process.env.URL_BACKEND + '/grupo/guardarRespuesta'
    const {setGrupos,setShrek} = useContext(UsuarioContext)
    const [usuarioRancio, dispatch] = useContext(Usuario_Context)
	const { inforUsuario } = usuarioRancio;

    const handleKeypress = async e => {
        //it triggers by pressing the enter key
    if (e.keyCode == 13) {
        const valueInput = e.target.value
        e.target.value = ''
        const res = await fetch(url, {
            body: JSON.stringify({
                id_usuario: id_usuario,
                id_grupo: id_grupo,
                id_comentario: idComentario,
                nick_usuario: nickUsuario,
                texto_respuesta: valueInput
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'POST'
            })
            e.target.value = ''
            const {msg, respuesta, comentario} =  await res.json()
            setNuevaRes([...respuestas, comentario])
            setGrupos(respuesta.grupos)
            if (msg == 'success'){
                
                dispatch({ 
                    type: types.setUser,
                    inforUsuario: respuesta
                   })
            }
        //agregarMensajes([...mensajes, {'usuario':'leo', 'msg': e.target.value}])
        //e.target.value = ""
        
        }
    };
    return (
        <div className="section_escribir_mensaje">
            <div className="content_escribir_mensaje">
                <input onKeyDown={handleKeypress} className="escribir_mensaje" name="mensaje" type="text" placeholder="Responder comentario"/>
                
            </div>
            
        </div>
        
    )

}