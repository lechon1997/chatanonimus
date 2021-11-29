import Comentario_leido from "./comentario_leido"
export default function Comentarios_leidos({id, id_g, comentariosLeidos, cambiarVista, nicknameUsuario}){

    return (
        <div >
            <div className="list-group">
                {
                    comentariosLeidos.map(comentarioN => (
                        <Comentario_leido 
                            key={comentarioN._id}
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