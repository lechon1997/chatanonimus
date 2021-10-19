import Link from 'next/link'
export default function Contenedor_login(){

    const registerUser = async event => {
        
        event.preventDefault()
        console.log(event)
        const res = await fetch('http://localhost:4000/usuario/', {
          body: JSON.stringify({
            name: event.target.name.value
          }),
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          method: 'POST'
        })
    
        const result = await res.json()
        console.log(result)
      }

    return (
        <div className="shadow rounded altura-xd w-75 bg-white">
          <div className=" d-flex ps-2 pb-1 pt-2 mb-3 bg-primary rounded-top ">
            <h2 className="text-white me-auto " >Iniciar sesión</h2>
            <i className="bi bi-chat text-white me-4 "></i>
          </div>
            
        <form className="p-3 " onSubmit={registerUser}>
        <div className=" d-flex flex-column justify-content-center  mb-2" >
            
            <div className="mx-1 mb-2 ">
                <input  className="w-100 px-2 h-40px rounded border-secondary" name="username" type="text" placeholder="Usuario"/>
            </div>

            <div className="mx-1 mb-4">
                <input className="w-100 px-2 h-40px rounded border-secondary" name="password" type="password" placeholder="Contraseña"/>
            </div>
            <div className="mx-1">
            <input className="w-100 h-40px btn btn-primary" type="submit" value="Ingresar"/>
            </div>
            
        </div>
        </form>
        <div className="mx-1 d-flex ">
        <Link  href="http://localhost:3000/usuario/registrarse">
          <a className="link-primary me-auto bd-highlight">Registrarse</a>
        </Link>
        <a className="link-primary  bd-highlight">¿Olvidaste tu contraseña?</a>
        </div>
        </div>
    )

}