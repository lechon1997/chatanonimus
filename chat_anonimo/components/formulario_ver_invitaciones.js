import React, { useState, useEffect, useContext } from 'react'
import { UsuarioContext } from '../context/usuarioContext'
import Invitacion_item from './invitacion_item'

export default function Formulario_nuevo_grupo({formulario, setFormulario}){
    const [solicitudesInfo, setSolicitudesInfo] = useState([]);
    const {usuario} = useContext(UsuarioContext)

    useEffect( async () =>{ 
        //event.preventDefault()
        const url = process.env.URL_BACKEND + '/usuario/verInvitaciones'
        const res = await fetch(url, {
          body: JSON.stringify({
            id_usuario: usuario._id
          }),
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          method: 'POST'
        })

        const json =  await res.json()
        setSolicitudesInfo(json.retorno)
        //console.log(json.info_grupo) 
    },[])


    return (
        <form className="contenedor_formulario_grupo">       
            <div className="purple_bien_de_macho">
                <p>Solicitudes de grupo</p>
            </div>
			<div className="div_invitaciones">               
				{							
					solicitudesInfo.map( invi_info => (
						<Invitacion_item
							key={invi_info.idInvitacion}
							idInvitacion={invi_info.idInvitacion}
							nombreGrupo={invi_info.nombreGrupo}
							nicknameUsuario={invi_info.nicknameUsuario}
							nombreUsuario={invi_info.nombreUsuario}
							apellidoUsuario={invi_info.apellidoUsuario}
						/>
					)) 
				}
			</div>
        
        </form>       
    )

}