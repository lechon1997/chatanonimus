
import Mensaje from './mensaje'
import ReactDOM from 'react-dom';
import {useState} from 'react';


export default function Contenedor_grupo(){

    const [mensajes, agregarMensajes] = useState([])
    const [mensajesNoLeidos, agregarMensajesNoLeidos] = useState([
        {'id':'1'},
        {'id':'2'},
        {'id':'3'}
    ])

    const handleSubmit = value => {
        console.log(value)
        console.log("mensaje enviado...")

        
        
        // or you can send data to backend
      };
    
      const handleKeypress = e => {
          //it triggers by pressing the enter key
        if (e.keyCode == 13) {
            
            agregarMensajes([...mensajes, {'usuario':'leo', 'msg': e.target.value}])
            e.target.value = ""
            //ReactDOM.render(<p>{e.target.value}</p>, document.getElementById('mensajes_grupo'));
            //handleSubmit(e.target.value)
            
        }
      };


    return (
        <div className="div_contenedor_grupo">
                {/*COMPONENT MENSAJES DEL GRUPO */}
                <div className="mensajes_grupo" id="mensajes_grupo">

                    {/*MENSAJES LEIDOS*/}

                    {/*MENSAJES NO LEIDOS*/}
                    {
                        mensajes.map(mensaje => (
                            <Mensaje
                                Key={mensaje.id}
                                mensaje={mensaje}
                            />
                        ))
                    }

                </div>

                {/*COMPONENT ESCRIBIR MENSAJE */}
                <div className="section_escribir_mensaje">
                    <div className="content_escribir_mensaje">
                        <input onKeyDown={handleKeypress} className="escribir_mensaje" name="mensaje" type="text" placeholder="Escribir mensaje"/>
                        <div className="div_icono_escribir_mensaje">
                        
                        </div>
                    </div>
                   
                </div>
        </div>
        
    )

}