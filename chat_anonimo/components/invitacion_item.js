import React,{useContext } from 'react'

export default function Grupo_item({idInvitacion, nombreGrupo, nicknameUsuario,nombreUsuario, apellidoUsuario}){
    return (
        <div>
             <p className="ms-3 mensaje_en_div_grupo">{ `El usuario ${nicknameUsuario} (${nombreUsuario} ${apellidoUsuario}) te ha invitado al grupo ${nombreGrupo}`  }</p>
        </div>
        
    )

}