import Link from 'next/link'

export default function Contenedor_login(){
    
    const registerUser = async event => {
        
        event.preventDefault()
        
        const nickname = encodeURIComponent(event.target.nickname.value)
        const password = encodeURIComponent(event.target.password.value)
        const url = process.env.URL_BACKEND + '/usuario/auth'
		console.log(url)
    
        const res = await fetch( url, {
          body: JSON.stringify({
            
            nickname,
            pass: password
          }),
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          method: 'POST'
        })
    
        const { msg } = await res.json()
        
        switch(msg){
        	case 'El usuario no existe':
				console.log("El usuario no existe")
				break
        	case 'Contraseña incorrecta':
				console.log("Contraseña incorrecta")
				break
			default:
          		localStorage.clear()				
				const url = process.env.URL_FRONTEND + "/inicio/"
				localStorage.setItem('token', msg)
				window.location.href = url			
        		break
        }
        
        //window.localStorage;
     
      }

    return (
        <div className="shadow rounded altura-xd bg-white"> 
        <div className=" d-flex ps-2 pb-1 pt-2 mb-3 bg-primary rounded-top ">
            <h2 className="text-white me-auto " >Iniciar sesión</h2>
            <i className="bi bi-chat text-white me-4 "></i>
        </div>
        
            
        <form className="p-3 " onSubmit={registerUser}>
        <div className=" d-flex flex-column justify-content-center  mb-2" >
            
            <div className="mx-1 mb-2 ">
                <input  className="w-100 px-2 h-40px rounded border-secondary" name="nickname" type="text" placeholder="Usuario"/>
            </div>

            <div className="mx-1 mb-4">
                <input className="w-100 px-2 h-40px rounded border-secondary" name="password" type="password" placeholder="Contraseña"/>
            </div>
            <div className="mx-1">
            <input className="w-100 h-40px btn btn-primary" type="submit" value="Ingresar"/>
            </div>
            
        </div>
        </form>
        <div className="mx-3 pb-2 d-flex align-items-end altura_footer_login">
          <Link  href="http://localhost:3000/usuario/registrarse">
            <a className="link-primary me-auto">Registrarse</a>
          </Link>
        <a className="link-primary">¿Olvidaste tu contraseña?</a>
        </div>
        
        </div>
    )

}