import { useState, useContext } from "react"
import { UsuarioContext } from '../context/usuarioContext'
import jwt_decode from "jwt-decode";

export default function Formulario_nuevo_grupo({formulario, setFormulario}){
    
    const { agregarGrupo, grupos } = useContext(UsuarioContext)
    const [errorAltaGrupo,seterrorAltaGrupo] = useState('')
    


    const registerGroup = async event => {
        
        event.preventDefault()
        const token = localStorage.getItem('token')
        const {usuario} = jwt_decode(token);
        
		const nombreGrupo = event.target.nombre.value;
		const descripcionGrupo = event.target.descripcion.value;
        const fileField = document.querySelector('input[type="file"]');
        //const url = process.env.URL_BACKEND + `/grupo/crearGrupo?usuario_id=${usuario.id}&nombreGrupo=${nombreGrupo}&descripcionGrupo=${descripcionGrupo}&fotoGrupo=${fotoGrupo}`
        const url =  process.env.URL_BACKEND + '/grupo/crearGrupo';

        const formData  = new FormData();
        formData.append('id_usuario', usuario.id);
        formData.append('nombreGrupo', nombreGrupo);
        formData.append('descripcionGrupo', descripcionGrupo);
        formData.append('foto', fileField.files[0]);
        const res = await fetch( url, {
          body: formData,
          method: 'POST'
        })

        const result = await res.json()
        console.log(result)
		switch(result.data){
            case 'Se ha creado el grupo correctamente':
                
                agregarGrupo([...grupos, result.grupo])
                setFormulario(formulario => !formulario)
                break
        }
      }

    return (
        <form encType="multipart/form-data" className="contenedor_formulario_grupo" onSubmit={registerGroup}>
        
            <div className="purple_bien_de_macho">
                <p>Crear grupo</p>
            </div>
            
            <input className="input_crear_grupo" type="text" name="nombre" placeholder="Nombre grupo"/>
            <input className="input_crear_grupo" type="text" name="descripcion" placeholder="Descripción del  grupo"/>
            <input className="input_crear_grupo" type="file" name="file"/>
            <div className="error_grupo">
                {errorAltaGrupo}
            </div>
            <div className="confirmar_grupo">
                <div>
                    <a onClick={ () => { setFormulario(formulario => !formulario)}}>Cancelar</a>
                    
                </div>
                <div>
                    
                <button className="xdd2" type="submit">Confirmar</button>
                </div> 
                              

            </div>

            



        </form>
        
    )

}