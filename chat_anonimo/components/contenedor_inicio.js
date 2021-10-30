import Grupo_item from './grupo_item'
import Grupo from './grupo'
export default function contenedor_inicio() {
	return (
		<div className="contenedor_inicio">
            {/* CABECERA*/}
			<div className="div_cabecera">
				<p>div 1</p>
			</div>

			{/* CONTENEDOR DE LISTA GRUPOS Y MENSAJES*/}
			<div className="div_content">
			
				{/* CONTENEDOR DE LISTA GRUPOS */}
				<div className="div_grupos">
					{/* Grupo 1 a manopla*/}
					<Grupo_item/>
					<Grupo_item/>
					<Grupo_item/>
					<Grupo_item/>
					<Grupo_item/>
					
					
					

				</div>

				{/* CONTENEDOR DE MENSAJES */}
				<Grupo/>
			</div>

		</div>
	)
}