
import Cabecera_grupo from './cabecera_grupo'
import Contenedor_grupo from './contenedor_grupo'
import { useContext } from 'react'
import { UsuarioContext } from '../context/usuarioContext'
import { Usuario_Context } from '../Usuario/usuarioProvider'
export default function Grupo({id}){
    
    const [usuarioRancio] = useContext(Usuario_Context)
	const { inforUsuario } = usuarioRancio;

    const { idGrupoVista, grupos } = useContext(UsuarioContext)
    const { grupo, comentariosNuevos, comentariosLeidos } = grupos.find( infoG => infoG.grupo._id === idGrupoVista )
    return (
        <div className="div_mensajes">
            <Cabecera_grupo 
                Grupo = { grupo }
            />
			<Contenedor_grupo
                ComentariosNuevos={ comentariosNuevos }
                ComentariosLeidos={ comentariosLeidos }
            />
        </div>
        
    )

}