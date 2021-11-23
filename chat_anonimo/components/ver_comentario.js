import Escribir_mensaje from "./escribir_mensaje"
export default function Ver_comentario({comentario, nickUsuario}){
    return (
        <div className="contenedor_mensaje">
            <div className="d-flex justify-content-between">
                <div className="cabecera_mensaje d-flex">
                    <div className="imagen_grupo_en_cabecera_mensajes ms-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                            <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                        </svg>
                    </div>
                    
                    <div className="ps-3"> 
                        <p className="fs-6 text-white m-0">Anónimo</p>
                        <p className="pijazo rojitoop m-0">{comentario.fecha}</p>
                    </div>
                </div>
                
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-heart-fill asdxasdxddD" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                </div>
            </div>
            <hr/>

            <div className="cuerpo_mensaje">
                <div className="d-flex justify-content-center">
                    <h2 className="fs-5 text-white mt-2">{comentario.asunto}</h2>
                </div>
                <div>
                    <p className="asdasdxDDshrek text-white mt-2 ms-3">{comentario.mensaje}</p>
                </div>

            </div>
            <hr/>
            <div className="opciones_mensaje d-flex">
                <div className="ms-3 mt-1">
                    <p className="violetitagod fw-light asdasdxDD">112 Votos</p>
                </div>
                   
            
            </div>
            
            <hr/>
            <div className="respuestas_mensaje">
                <Escribir_mensaje idComentario={comentario._id} nickUsuario={nickUsuario}/>
            </div>

            {/* RESPUESTAS */}
            <div className="">
                {
                    comentario.respuestas.map(respuesta =>(
                        
                        <div className="contenedor_respuesta_xd ">
                            <div className="imagen_grupo_en_cabecera_mensajes d-flex me-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                    <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                                    <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                                </svg>
                            </div>
                            
                            <div className="w-100">
                                <div className="w-100 d-flex justify-content-between">
                                    <p className="m-0 sdfuibiufeiub fs-6">{respuesta.nombreUsuario}</p>
                                    <p className="mb-1 mt-1 me-3 asfdiusofdsdfaasfd">{comentario.createdAt.substring(0,10)}</p>
                                </div>
                                
                                <p className="m-0 rojitoop text-break">{respuesta.texto}</p>
                            </div>
                        </div>
                    ) )
                }

            </div>

        </div>
        
    )

}