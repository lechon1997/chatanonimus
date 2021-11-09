import Ranciada2 from '../../components/ranciada2'
import { UsuarioProvider} from '../../context/usuarioContext'
import Usuario_Provider from '../../Usuario/usuarioProvider'

export default function dashbor() {
	
	return (
		<Usuario_Provider>
			<UsuarioProvider>
				<div className="inicioxd">
					<Ranciada2/>
				</div>
			</UsuarioProvider>
		</Usuario_Provider>
		
	)
}