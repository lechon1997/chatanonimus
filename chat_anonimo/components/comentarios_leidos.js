import Comentario_leido from "./comentario_leido"
export default function Comentarios_leidos({comentariosLeidos, cambiarVista, nicknameUsuario}){

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
                        />
                    ))
                }
            </div>     
        </div>
    )

}