import Link from 'next/link'
export default function Contenedor_reg(){
    
    function objToQueryString(obj) {
        const keyValuePairs = [];
        for (const key in obj) {
          keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return keyValuePairs.join('&');
    }

    const registerUser = async event => {
        
        event.preventDefault()

        const queryString = objToQueryString({
            'nickname': encodeURIComponent(event.target.nickname.value),
            'nombre': encodeURIComponent(event.target.nombre.value),
            'apellido': encodeURIComponent(event.target.apellido.value),
            'celular': encodeURIComponent(event.target.celular.value),
            'foto': encodeURIComponent(event.target.foto.value),
            'password': encodeURIComponent(event.target.password.value)
        });

        const nickname = encodeURIComponent(event.target.nickname.value)
        const nombre = encodeURIComponent(event.target.nombre.value)
        const apellido = encodeURIComponent(event.target.apellido.value)
        const celular = encodeURIComponent(event.target.celular.value)
        const foto = encodeURIComponent(event.target.foto.value)
        const password = encodeURIComponent(event.target.password.value)

        //?nombreGrupo=${nombreGrupo}?descripcionGrupo=${descripcionGrupo}?fotoGrupo=${fotoGrupo}

        const res = await fetch(`http://localhost:4000/usuario/crearUsuario?nickname=${nickname}&nombre=${nombre}&apellido=${apellido}&celular=${celular}&foto=${foto}&password=${password}`, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }, 
            method: 'GET'
        })
    
        const result = await res.json()
        console.log(result)
      }

    return (
        <div className="shadow rounded p-3 w-75 bg-white opacity-75">
            <h2 className="mx-1 mb-4">Registrarse</h2>
        <form onSubmit={registerUser}>
        <div className=" d-flex flex-column justify-content-center mb-2" >
            
            <div className="mx-1 mb-2 ">
                <input  className="w-100 px-2 h-40px rounded border-secondary" name="nickname" type="text" placeholder="nickname"/>
            </div>
            <div className="mx-1 mb-2 ">
                <input  className="w-100 px-2 h-40px rounded border-secondary" name="nombre" type="text" placeholder="nombre"/>
            </div>
            <div className="mx-1 mb-2 ">
                <input  className="w-100 px-2 h-40px rounded border-secondary" name="apellido" type="text" placeholder="apellido"/>
            </div>
            <div className="mx-1 mb-2 ">
                <input  className="w-100 px-2 h-40px rounded border-secondary" name="celular" type="text" placeholder="celular"/>
            </div>
            <div className="mx-1 mb-2 ">
                <input  className="w-100 px-2 h-40px rounded border-secondary" name="foto" type="text" placeholder="foto"/>
            </div>

            <div className="mx-1 mb-4">
                <input className="w-100 px-2 h-40px rounded border-secondary" name="password" type="password" placeholder="Contraseña"/>
            </div>
            <div className="mx-1 mb-4">
                <input className="w-100 px-2 h-40px rounded border-secondary" name="confpassword" type="password" placeholder="Confirmar contraseña"/>
            </div>
            <div className="d-flex">
            <div className="mx-1">
            <input className="w-100 h-40px btn btn-primary" type="submit" value="Confirmar"/>
            </div>
            <div className="mx-1">
            <input className="w-100 h-40px btn btn-secondary" type="submit" value="Volver"/>
            </div>
            </div>
        </div>
        </form>
        <div className="mx-1 d-flex h-25 pb-2 flex-fill align-items-end bd-highlight ">
        </div>
        </div>
    )

}