import { createContext, useReducer } from "react";
import usuarioReducer, { initialUsuario } from './usuarioReducer';

const Usuario_Context = createContext();

const Usuario_Provider = ({children}) => {
    const [usuarioRancio, dispatch] = useReducer(usuarioReducer, initialUsuario);
    
    return (
        <Usuario_Context.Provider
            value ={ [usuarioRancio, dispatch] } 
        >
            {children}

        </Usuario_Context.Provider>
    )
}

export { Usuario_Context };
export default Usuario_Provider;