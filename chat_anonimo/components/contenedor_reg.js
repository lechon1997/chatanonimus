import Link from 'next/link'
export default function Contenedor_reg(){

    const volver = async event => {
        window.location.href = process.env.URL_FRONTEND
    }

    const registerUser = async event => {
        
        event.preventDefault()

        const nickname = event.target.nickname.value
        const nombre = event.target.nombre.value
        const apellido = event.target.apellido.value
        const celular = event.target.celular.value
        const password = encodeURIComponent(event.target.password.value)
        const confpassword = encodeURIComponent(event.target.confpassword.value)
        const fileField = document.querySelector('input[type="file"]');
        const url = process.env.URL_BACKEND + "/usuario/crearUsuario"

        if(nickname == ""){
            document.getElementById('error').innerHTML = 'Debe ingresar un nickname.';
        }else if(nombre == ""){
            document.getElementById('error').innerHTML = 'Debe ingresar su nombre.';
        }else if(apellido == ""){
            document.getElementById('error').innerHTML = 'Debe ingresar su apellido.';
        }else if(celular == ""){
            document.getElementById('error').innerHTML = 'Debe ingresar un celular.';
        }else if(password == ""){
            document.getElementById('error').innerHTML = 'Debe ingresar una contraseña.';
        }else if(confpassword == ""){
            document.getElementById('error').innerHTML = 'Debe confirmar su contraseña.';
        }else if(password != confpassword){
            document.getElementById('error').innerHTML = 'Las contraseñas no coinciden!';
        }else{
            const formData  = new FormData();
            formData.append('nickname', nickname);
            formData.append('nombre', nombre);
            formData.append('apellido', apellido);
            formData.append('celular', celular);
            formData.append('password', password);
            formData.append('foto', fileField.files[0]);

            const res = await fetch(url, {
              body: formData,
              method: 'POST'
            })
        
            const result = await res.json()

            if(result.msg == "success"){
                localStorage.clear()                
                const url = process.env.URL_FRONTEND
                //localStorage.setItem('token', msg)
                window.alert("Usuario creado correctamente! Logeate!");
                window.location.href = url
            }else if(result.msg == "El usuario ya existe"){
                document.getElementById('error').innerHTML = 'El usuario ya existe!';
            }
            console.log(result)
        }

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
            <label>foto:  </label>
                <input className="" type="file" name="file"/>
            </div>

            <div className="mx-1 mb-4">
                <input className="w-100 px-2 h-40px rounded border-secondary" name="password" type="password" placeholder="Contraseña"/>
            </div>
            <div className="mx-1 mb-4">
                <input className="w-100 px-2 h-40px rounded border-secondary" name="confpassword" type="password" placeholder="Confirmar contraseña"/>
            </div>
            <div className="mx-1 mb-2 " style={{ color: 'red' }}>
                <label id="error"></label>
            </div>

            <div className="d-flex">
            <div className="mx-1">
            <input className="w-100 h-40px btn btn-primary" type="submit" value="Confirmar"/>
            </div>
            <div className="mx-1">
            <input className="w-100 h-40px btn btn-secondary" onClick={volver} id="volver" type="button" value="Volver"/>
            </div>
            </div>
        </div>
        </form>
        <div className="mx-1 d-flex h-25 pb-2 flex-fill align-items-end bd-highlight ">
        </div>
        </div>
    )

}