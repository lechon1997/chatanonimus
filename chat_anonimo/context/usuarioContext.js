import React, { createContext, useState } from "react";

export const UsuarioContext = createContext();

export const UsuarioProvider = ({children}) => {

    const [idGrupoVista, setIdGrupovista] = useState('')
    const [vista_grupo, setVistaGrupo] = useState('')
    const [grupos, setGrupos] = useState([])
    const [shrek, setShrek] = useState({})
    
 
    return (
        <UsuarioContext.Provider value={{
                
                vista_grupo,
                setVistaGrupo,
                idGrupoVista,
                setIdGrupovista,
                grupos,
                setGrupos,
                shrek,
                setShrek
                
            }}>
            { children }
        </UsuarioContext.Provider>
    )
}