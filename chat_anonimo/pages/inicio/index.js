import Contenedor_inicio from '../../components/contenedor_inicio'
import { UsuarioProvider } from '../../context/usuarioContext'
import { SocketProvider } from '../../context/socketContext'


export default function dashbor() {
	return (
		<UsuarioProvider>
			<SocketProvider>
			<div className="inicioxd">
				<Contenedor_inicio/>
			</div>
			</SocketProvider>
		</UsuarioProvider>
		
	)
}