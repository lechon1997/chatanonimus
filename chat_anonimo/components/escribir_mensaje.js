
import { types } from '../Usuario/usuarioReducer'
import { Usuario_Context } from '../Usuario/usuarioProvider'
import { useContext } from 'react'

export default function Escribir_mensaje({agregarMensajes,mensajes, idComentario,nickUsuario}){
    const url = process.env.URL_BACKEND + '/grupo/guardarRespuesta'

    const [usuarioRancio, dispatch] = useContext(Usuario_Context)
	const { inforUsuario } = usuarioRancio;

    const handleKeypress = async e => {
        //it triggers by pressing the enter key
    if (e.keyCode == 13) {
        console.log(e.target.value)
        const res = await fetch(url, {
            body: JSON.stringify({
                id_comentario: idComentario,
                nick_usuario: nickUsuario,
                texto_respuesta: e.target.value
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'POST'
            })
    
            const {msg, respuesta} =  await res.json()
            
            if (msg == 'success'){
                dispatch({ 
                    type: types.agregarRespuesta,
                    respuesta_user: respuesta,
                    id_comentario: idComentario
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