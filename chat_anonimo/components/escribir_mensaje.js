
export default function Escribir_mensaje({agregarMensajes,mensajes}){
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
        <div className="section_escribir_mensaje">
            <div className="content_escribir_mensaje">
                <input onKeyDown={handleKeypress} className="escribir_mensaje" name="mensaje" type="text" placeholder="Escribir mensaje"/>
                <div className="div_icono_escribir_mensaje">
                
                </div>
            </div>
            
        </div>
        
    )

}