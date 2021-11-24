import React, {useContext } from 'react'
import { UsuarioContext } from '../context/usuarioContext'

export default function Grupo_item({idInvitacion, nombreGrupo, nicknameUsuario, nombreUsuario, apellidoUsuario}){
    const {grupos, setGrupos} = useContext(UsuarioContext) 
    const aceptarInvitacion = async (event) => {      
        event.preventDefault()

        const url = process.env.URL_BACKEND + "/usuario/aceptarInvitacion"
        console.log(event.target.value)
        const res = await fetch(url, {
            body: JSON.stringify({
                id_invitacion: event.target.value,
                estado: true
              }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
              },
            method: 'POST'
        })
        
        var element = document.getElementById(event.target.value);
        element.parentNode.removeChild(element);
        
        const result = await res.json()

        setGrupos([...grupos, result.info_grupo])

      }

      const rechazarInvitacion = async (event) => {
        
        event.preventDefault()

        const url = process.env.URL_BACKEND + "/usuario/aceptarInvitacion"
    
        const res = await fetch(url, {
            body: JSON.stringify({
                id_invitacion: event.target.value,
                estado: false
              }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
              },
            method: 'POST'
        })

        var element = document.getElementById(event.target.value);
        element.parentNode.removeChild(element);
    
        const result = await res.json()

        console.log(result)
      }

    return (
        <div id = {idInvitacion}>
             <p className="ms-3 mensaje_en_div_grupo">{ `${nicknameUsuario} te ha invitado al grupo ${nombreGrupo}`  }</p>
             <div className ="d-flex flex-row-reverse ">
                <button className="xdd2" name = "rechazar" onClick={rechazarInvitacion} value={idInvitacion}>Rechazar</button>
                <button className="xdd2" name = "aceptar" onClick={aceptarInvitacion} value={idInvitacion}>Confirmar</button>                
             </div>
             <hr></hr>
        </div>       
    )

}