import Contenedor_inicio from '../../components/contenedor_inicio'
import { UsuarioProvider } from '../../context/usuarioContext'


export default function dashbor() {
	return (
		<UsuarioProvider>
			<div className="inicioxd">
				<Contenedor_inicio/>
			</div>
		</UsuarioProvider>
		
	)
}