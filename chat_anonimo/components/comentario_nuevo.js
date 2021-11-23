import { Usuario_Context } from '../Usuario/usuarioProvider'
import { useContext } from 'react'

export default function Comentario_nuevo({asunto, fecha, mensaje, id}){
    const [usuarioRancio] = useContext(Usuario_Context)
	const { inforUsuario } = usuarioRancio;

    const visto = async () => {
        const url = process.env.URL_BACKEND + '/grupo/tevi'
        const res = await fetch(url, {
          body: JSON.stringify({
              idmensaje: id,
              idusuario: inforUsuario.usuario._id
            
          }),
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          method: 'POST'
        })
    }

    return (

    <a href="#" className="list-group-item list-group-item-action" onClick={ visto }>
            <div className="d-flex">
                <div className="div_imagen_grupo_ranciada">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                    </svg>
                </div>
                <div className=" w-100">
                <p className="m-0 color_user_comentario">Anónimo</p>
                    <div className="d-flex w-100 justify-content-between">
                        <h6 className="m-0">{ asunto }</h6>
                        <small>{ fecha }</small>
                    </div>
                    <p className="m-0">{ mensaje }</p>
                </div>
            
            </div>
            
        </a>
    )

}