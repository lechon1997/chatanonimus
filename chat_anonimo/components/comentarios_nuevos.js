import Comentario_nuevo from "./comentario_nuevo"

export default function Comentarios_nuevos({ id, id_g, comentariosNuevos, cambiarVista, nicknameUsuario }){
    //console.log(comentariosNuevos)

    return (
        <div >
            <div className="list-group">
                {
                    comentariosNuevos.map(comentarioN => (
                        <Comentario_nuevo 
                            key= {comentarioN._id}
                            comentario={comentarioN}
                            ranciada={cambiarVista}
                            nickUsuario={nicknameUsuario}
                            id_usuario={id}
                            id_grupo={id_g}
                        />
                    ))
                }
            </div>     
        </div>
    )

}