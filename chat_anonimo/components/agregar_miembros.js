export default function agregar_miembros({socket, id, id_g}){

    const crearInvitacion = async event => {
        event.preventDefault()
        const url = process.env.URL_BACKEND + '/grupo/agregarMiembro' 
        const res = await fetch(url, {
          body: JSON.stringify({            
            usuario_id: id,
            grupo_id: id_g,
            nickname: event.target.nickname.value,
            rol: event.target.rol.value,
            esadmin: event.target.esadmin.checked
          }),
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          method: 'POST'
        })

        const { msg } = await res.json()
        console.log(msg)    
    }

    return (
        <form onSubmit = {crearInvitacion} className="ms-5 mt-1 maximolargoxd">
            <div>
                <br></br>                 
                <input type="text" className="form-control w-50 bg-light" name="nickname" placeholder="Nickname de usuario"/>
                <br></br>
                <input type="text" className="form-control w-50 bg-light" name="rol" placeholder="Rol de usuario en grupo"/>
                <br></br>
                <label className="blanco"><input type="checkbox" id="cbox1" name = "esadmin" value="first_checkbox"/> ¿Es admin?</label>
            </div>
            <div className="mt-3 maximolargoxd">
                <div className="w-50 d-flex flex-row-reverse bd-highlight ">
                    <button type="submit" className="btn btn-light">Enviar invitación</button>
                </div>
            </div>
        </form>
        
    )

}