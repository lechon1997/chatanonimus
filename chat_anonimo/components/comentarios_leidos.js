import Comentario_leido from "./comentario_leido"
export default function Comentarios_leidos({comentariosLeidos}){

    return (
        <div >
            <div className="list-group">
                {
                    comentariosLeidos.map(comentarioN => (
                        <Comentario_leido 
                            key= {comentarioN._id}
                            id = {comentarioN._id}
                            asunto= {comentarioN.asunto }
                            fecha= { comentarioN.createdAt.substring(0,10) }
                            mensaje = { comentarioN.mensaje }
                        />
                    ))
                }
            </div>     
        </div>
    )

}