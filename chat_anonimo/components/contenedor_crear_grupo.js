export default function contenedor_crear_grupo(){

	function objToQueryString(obj) {
		const keyValuePairs = [];
		for (const key in obj) {
		  keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
		}
		return keyValuePairs.join('&');
	  }

    const registerGroup = async event => {
        
        event.preventDefault()

		const queryString = objToQueryString({
			'nombreGrupo': encodeURIComponent(event.target.nombre.value),
			'descripcionGrupo': encodeURIComponent(event.target.descripcion.value),
			'fotoGrupo': encodeURIComponent(event.target.foto.value),
		});
		
		const nombreGrupo = encodeURIComponent(event.target.nombre.value);
		const descripcionGrupo = encodeURIComponent(event.target.descripcion.value);
		const fotoGrupo = encodeURIComponent(event.target.foto.value);

		//?nombreGrupo=${nombreGrupo}?descripcionGrupo=${descripcionGrupo}?fotoGrupo=${fotoGrupo}

		const res = await fetch(`http://localhost:4000/grupo/crearGrupo?nombreGrupo=${nombreGrupo}&descripcionGrupo=${descripcionGrupo}&fotoGrupo=${fotoGrupo}`, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}, 
			method: 'GET'
		})

		/*const res = await fetch('http://localhost:4000/grupo/crearGrupo?nombreGrupo='+nombreGrupo+'?descripcionGrupo='+descripcionGrupo+'?fotoGrupo='+fotoGrupo, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}, 
			method: 'GET'
		})

        const res = await fetch('http://localhost:4000/grupo/crearGrupo', {
			body: JSON.stringify({
				nombreGrupo: event.target.nombre.value,
				'descripcionGrupo': event.target.descripcion.value,
				'fotoGrupo': event.target.foto.value
			  }),  
			headers: {
            'Content-Type': 'multipart/form-data'
          	}, 
          	method: 'POST'
        })*/
    
        const result = await res.json()
        console.log(result)
      }

    return (
		<div className="shadow border p-3 rounded w-75 bg-white">
			<h2 className="mx-1 mb-4">Crear grupo</h2>
			<form onSubmit={registerGroup}>
				<div className=" d-flex flex-column justify-content-center mb-2" >
					<div className="mx-1 mb-2 ">
						<input className="w-100 px-2 h-40px rounded border-secondary" name="nombre" type="text" placeholder="Nombre" />
					</div>
					<div className="mx-1 mb-2 ">
						<input className="w-100 px-2 h-40px rounded border-secondary" name="descripcion" type="text" placeholder="Descripción" />
					</div>
					<div className="mx-1 mb-2 ">
						<input className="w-100 px-2 h-40px rounded border-secondary" name="foto" type="text" placeholder="Imagen" />
					</div>
					<div className="d-flex">
						<div className="mx-1">
							<input className="w-100 h-40px btn btn-primary" type="submit" value="Confirmar" />
						</div>
						<div className="mx-1">
							<input className="w-100 h-40px btn btn-secondary" type="submit" value="Volver" />
						</div>
					</div>
				</div>
			</form>
			<div className="mx-1 d-flex h-25 pb-2 flex-fill align-items-end bd-highlight ">
			</div>
		</div>
		
    )

}