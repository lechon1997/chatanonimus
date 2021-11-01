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
        
		const nombreGrupo = encodeURIComponent(event.target.nombre.value);
		const descripcionGrupo = encodeURIComponent(event.target.descripcion.value);
		const fotoGrupo = ''
        //const fotoGrupo = encodeURIComponent(event.target.foto.value);
        const url = process.env.URL_BACKEND + `/grupo/crearGrupo?usuario_id=${usuario.id}&nombreGrupo=${nombreGrupo}&descripcionGrupo=${descripcionGrupo}&fotoGrupo=${fotoGrupo}`

		const res = await fetch(url, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}, 
			method: 'GET'
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
        <form className="contenedor_formulario_grupo" onSubmit={registerGroup}>
        
            <div className="purple_bien_de_macho">
                <p>Crear grupo</p>
            </div>
            
            <input className="input_crear_grupo" type="text" name="nombre" placeholder="Nombre grupo"/>
            <input className="input_crear_grupo" type="text" name="descripcion" placeholder="Descripción del  grupo"/>
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