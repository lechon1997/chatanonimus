import Grupo_item from './grupo_item'
import React,{ useState, useContext } from 'react'
import { UsuarioContext } from '../context/usuarioContext'
import { io } from "socket.io-client";
import Formulario_crear_grupo from './formulario_nuevo_grupo'
import { Usuario_Context } from '../Usuario/usuarioProvider'
import Formulario_ver_solicitud from './formulario_ver_invitaciones'


export default function contenedor_inicio() {
	const [usuarioRancio] = useContext(Usuario_Context)
	const { inforUsuario } = usuarioRancio;
	const { grupos, grupovista} = useContext(UsuarioContext)

	const [vistaCasera, setVistaCasera] = useState('')

	const socket_frontend = io('http://localhost:4000', { transports : ['websocket'] })

	socket_frontend.on("connection",{});
			
	socket_frontend.emit("guardarSocket", {
		usuario_id : inforUsuario._id,
		id_socket: socket_frontend.id
	})

	socket_frontend.on("msg_recibido",(data) => {
		console.log("Información socket:", data)
	})

	
	const [formularioGrupo, setFormularioGrupo] = useState(false)
	const [formularioSolicitud, setFormularioSolicitud] = useState(false)
	return (
		
		<div className="contenedor_inicio">
            {/* CABECERA*/}
			<div className="div_cabecera">
				<p>div 1</p>
			</div>

			{/* CONTENEDOR DE LISTA GRUPOS Y MENSAJES*/}
			<div className="div_content">

				{/* PANEL GRUPOS */}
				<div className="panel_grupos">
					{/* PANEL ACTIONS GRUPOS*/}
					<div className="panel_actions_grupo">
						<div>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
								<path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
								<path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
								<path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
							</svg>
							<a onClick={ () => { setFormularioGrupo(formularioGrupo => !formularioGrupo)}}>Crear grupo</a>
						</div>
						<div>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
  								<path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
							</svg>
							<a onClick={ () => { setFormularioSolicitud(formularioSolicitud => !formularioSolicitud)}}> Solicitudes</a>
						</div>
					</div>
					{/* FORMULARIO CREAR GRUPO */}
					{
						formularioGrupo === true ? <Formulario_crear_grupo formulario={formularioGrupo} setFormulario={setFormularioGrupo}/> : '' 

					}
					{/* FORMULARIO SOLICITUDES */}
					{
						formularioSolicitud === true ? <Formulario_ver_solicitud formulario={formularioSolicitud} setFormulario={setFormularioSolicitud}/> : '' 

					}
					<div>

					</div>
				
					{/* CONTENEDOR DE LISTA GRUPOS */}
					<div className="div_grupos">
						{/* Grupo 1 a manopla*/}

						{
							/*
							 console.log(inforUsuario.grupos)
								*/
													
						grupos.map( grupo => (
								
								<Grupo_item
								key={grupo._id}
								id={grupo._id}
								nombreGrupo={grupo.nombre}
								descGrupo={grupo.descripcion}
								setVistaC={setVistaCasera}
								
								/>

						)) 
						}
						
					</div>
					{ }
				</div>
				

				{/* CONTENEDOR DE GRUPO */}
				{ vistaCasera }
			</div>

		</div>
		
	)
	
}