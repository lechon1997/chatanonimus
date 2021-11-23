const types = {
     setUser: 'nuevo - usuario',
     agregarRespuesta: 'nueva - respuesta'
}

const initialUsuario = {
    inforUsuario : { 
        user: {},
        grupos: [],
        comentariosNuevos: [],
        comentariosLeidos: [],
        primeraVez: true
    }
    
}


const usuarioReducer = (state, action) => {
    switch (action.type){
        case types.setUser:
            return {
                ...state,
                inforUsuario: action.inforUsuario
            }
            inforUsuario.co
        case types.agregarRespuesta:
            /*state.inforUsuario.grupos.map(grupo => (
                grupo.comentariosLeidos.map(comentario => comentario._id === action.id_comentario? {...comentario, comentario.respuestas.push(action.respuesta_user)} : comentario)
            ))*/
            return {
                ...state

            }
        default:
            return state;
    }
}


export { initialUsuario, types }
export default usuarioReducer