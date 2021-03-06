import Contenedor_inicio from './contenedor_inicio'
import { UsuarioContext } from '../context/usuarioContext'
import { useContext, useEffect} from 'react'
import { Usuario_Context } from '../Usuario/usuarioProvider'
import { types } from '../Usuario/usuarioReducer'
import jwt_decode from "jwt-decode";

export default function Ranciada2(){
    const [usuarioRancio, dispatch] = useContext(Usuario_Context)
    const { inforUsuario } = usuarioRancio;
	const {setGrupos,setShrek} = useContext(UsuarioContext)
    
    const url_info_usuario = process.env.URL_BACKEND + '/usuario/'
    const url_grupos_usuario = process.env.URL_BACKEND + '/grupo/'
	
	
	useEffect(async () => {
		let token = localStorage.getItem('token')
		const {usuario} = jwt_decode(token);
        
        //DATOS USUARIO
		const  res_usuario_nojs = await fetch( url_info_usuario, {
			body: JSON.stringify({
			  id_usu: usuario.id
			}),
			headers: {
			  'Content-Type': 'application/json; charset=utf-8'
			},
			method: 'POST'
		  })
		 const res_usuario_js = await res_usuario_nojs.json()
     
         
         //DATOS GRUPOS
         const res_grupos_nojs = await fetch( url_grupos_usuario, {
			body: JSON.stringify({
			  id_usu: usuario.id
			}),
			headers: {
			  'Content-Type': 'application/json; charset=utf-8'
			},
			method: 'POST'
		  	})
		console.log("pijazo esta materia")
		const res_grupos_js = await res_grupos_nojs.json()
		//const {grupo} = res_grupos_js.grupos
		//console.log(res_grupos_js.grupos)
		setGrupos(res_grupos_js.grupos) 
        
        var info_usuario = {usuario: res_usuario_js.usuario, grupos: res_grupos_js.grupos  }
		setShrek(info_usuario)
		dispatch({ 
            type: types.setUser,
            inforUsuario: info_usuario
           })
        
	} , [])

    return (
        <div className="inicioxd">
            <Contenedor_inicio/>
        </div>
        
    )

}