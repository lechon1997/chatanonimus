import {useContext } from 'react';
import { io } from "socket.io-client";
export default function Crear_comentario({id, id_g}) {
    
    const dataxd = async event => {
        event.preventDefault()
        const url = process.env.URL_BACKEND + '/grupo/nuevoComentario'
        const res = await fetch(url, {
          body: JSON.stringify({
            
            usuario_id: id,
            grupo_id: id_g,
            asunto: event.target.asunto.value,
            mensaje: event.target.mensaje.value,
            anonimo: true
          }),
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          method: 'POST'
        })

        const { msg, data } = await res.json()
		
		const socket = io('http://localhost:4000', { transports : ['websocket'] })
		socket.on("connection",{});
		
		if(msg === 'success') {
			
			socket.emit("msg_frontend_to_backend", {
				usuario_id: id,
				grupo_id: id_g,
				asunto: event.target.asunto.value,
				mensaje: event.target.mensaje.value,
				anonimo: true,
				usuarios: data
			})
		}


		socket.on("msg_recibido", (datos) => {
			 console.log(datos)});
		

        
        
      
        //console.log(data)
        
          
        
        
        
    }

      return (
    
            <form onSubmit={dataxd} className="ms-5 mt-1 maximolargoxd">
                <div className="">
  <label htmlFor="exampleFormControlInput1" className="form-label text-light mt-3">Asunto</label>
  <input name="asunto" type="text" className="form-control w-75 bg-light" id="exampleFormControlInput1" placeholder="Asunto del comentario"/>
</div>
<div className="w-75 ">
  <label htmlFor="exampleFormControlTextarea1" className="form-label text-light mt-3">Comentario</label>
  <textarea name="mensaje"className="form-control alturatextarea bg-light" placeholder="Escribe tu comentario aquí" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>
<div className="mt-3 maximolargoxd">
    <div className="w-75 d-flex flex-row-reverse bd-highlight">
<button type="submit" className="btn btn-light ">Enviar comentario</button>
</div>
</div>            
            </form>
         
      )
    
  }
