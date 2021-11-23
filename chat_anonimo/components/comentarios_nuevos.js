import Comentario_nuevo from "./comentario_nuevo"

export default function Comentarios_nuevos({ comentariosNuevos }){
    //console.log(comentariosNuevos)

    return (
        <div >
            <div className="list-group">
                {
                    comentariosNuevos.map(comentarioN => (
                        <Comentario_nuevo 
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