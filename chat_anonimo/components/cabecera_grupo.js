import React,{useContext } from 'react'
import { UsuarioContext } from '../context/usuarioContext'
import { Usuario_Context } from '../Usuario/usuarioProvider'


export default function Cabecera_grupo(){
    
    const [usuarioRancio] = useContext(Usuario_Context)
	const { inforUsuario } = usuarioRancio;

    const { idGrupoVista } = useContext(UsuarioContext)
    const { grupo } = inforUsuario.grupos.find( infoG => infoG.grupo._id === idGrupoVista )
    //console.log(grupo)
    return (
        <div className="cabecera_div_mensajes">
					
			{/* DIV IMAGEN DEL GRUPO*/}
            <div className="imagen_grupo_en_cabecera_mensajes">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                    <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                </svg>
            </div>

            {/* DIV INFO GRUPO*/}
            <div className="">
                <p className="m-0 ms-3 nombre_grupo">{grupo.nombre}</p>
                <p className="ms-3 mensaje_en_div_grupo">4 miembros</p>
                
            </div>
        </div>
        
    )

}

