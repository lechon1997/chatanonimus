import { createContext } from "react";

export const UsuarioContext = createContext();

const UsuarioProvider = (props) => {
    <UsuarioContext.Provider>
        {props.children}
    </UsuarioContext.Provider>
}