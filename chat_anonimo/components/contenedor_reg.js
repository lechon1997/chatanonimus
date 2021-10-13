import Link from 'next/link'
export default function Contenedor_reg(){

    const registerUser = async event => {

        event.preventDefault()
    
        const res = await fetch('/api/usuario', {
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
        <div className="shadow border p-3 rounded w-75">
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
            <input className="w-100 h-40px btn btn-primary" type="submit" value="Comfirmar"/>
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