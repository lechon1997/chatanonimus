import Comentarios_nuevos from './comentarios_nuevos'
import Comentarios_leidos from './comentarios_leidos'
import Ver_grupo from './ver_grupo'
import Agregar_miembros from './Agregar_miembros'
import Crear_comentario from './crear_comentario'
import { useState, useEffect, useContext } from 'react'
import { UsuarioContext } from '../context/usuarioContext'
import { SocketContext } from '../context/socketContext';

export default function Contenedor_grupo(){
	const { vista_grupo, setVistaGrupo } = useContext(UsuarioContext)

	const { socket_io } = useContext(SocketContext)
    const { usuario, idGrupoVista} = useContext(UsuarioContext)
 
	
    return (

        <div className="div_contenedor_grupo">
               
                
                    {/*PANEL IZQUIERDO DE MENSAJES LEIDOS Y NO LEIDOS */}
                <div className="panel_mensajes">
                    
					<div className="boton_panel">
                		<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
  							<path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
						</svg>
                           {/*  <a onClick={ () => { cambiarVista(Crear_comentario)}} className="link-light w-100" >Crear comentario</a> */}
                           
						   <a onClick={ () => { setVistaGrupo(<Crear_comentario socket={socket_io} id= {usuario._id} id_g={idGrupoVista}/>)}} className="link-light w-100" >Crear comentario</a>
                          
                    </div>

                    <div className="boton_panel">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-envelope-open" viewBox="0 0 16 16">
                            <path d="M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.818l5.724 3.465L8 8.917l1.276.766L15 6.218V5.4a1 1 0 0 0-.53-.882l-6-3.2zM15 7.388l-4.754 2.877L15 13.117v-5.73zm-.035 6.874L8 10.083l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738zM1 13.117l4.754-2.852L1 7.387v5.73zM7.059.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765l6-3.2z"/>
                        </svg>
						<a onClick={ () => { setVistaGrupo(Comentarios_leidos)}} className="link-light w-100" >Comentarios leidos</a>
                        
                            
                    </div>
                    
                    <div className="boton_panel">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
                        </svg>
						<a onClick={ () => { setVistaGrupo(Comentarios_nuevos)}} className="link-light w-100" >Comentarios nuevos</a>
                    
                    </div>
                    
                    <div className="boton_panel">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                            <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                        </svg>
						<a onClick={ () => { setVistaGrupo(Agregar_miembros)}} className="link-light w-100" >Agregar miembros</a>
                        
                            
                        
                    </div>
                    
                    <div className="boton_panel">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-people-fill hover-nazi" viewBox="0 0 16 16">
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                            <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                        </svg>
                        
						<a onClick={ () => { setVistaGrupo(<Ver_grupo id_g={idGrupoVista}/>)}} className="link-light w-100" >Ver grupo</a>
                        
                    </div>

                </div>
					<div className="mequierosuicidar">
					{ vista_grupo }
					</div>
				<div>
        </div>
        </div>

    )

}