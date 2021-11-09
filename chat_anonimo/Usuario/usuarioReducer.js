const types = {
     setUser: 'nuevo - usuario'
}

const initialUsuario = {
    inforUsuario : { 
        user: {},
        grupos: []
    }
    
}


const usuarioReducer = (state, action) => {
    switch (action.type){
        case types.setUser:
            return {
                ...state,
                inforUsuario: action.inforUsuario
            }
        
        default:
            return state;
    }
}


export { initialUsuario, types }
export default usuarioReducer