import React, { createContext, useState } from "react";

export const UsuarioContext = createContext();

const dataRandom = {
    name:'Manuel',
    apellido:'Turizo'
}

export const UsuarioProvider = ({children}) => {

    const [usuario, setUsuario] = useState([])
    const [grupos,agregarGrupo] = useState([])
    const [grupovista, setGrupovista] = useState('')
    const [idGrupoVista, setIdGrupovista] = useState('')
    const [socket_io, setSocket] = useState('')
    
    
    return (
        <UsuarioContext.Provider value={{
                grupos,
                agregarGrupo,
                grupovista,
                setGrupovista,
                idGrupoVista,
                setIdGrupovista,
                usuario,
                setUsuario,
                socket_io,
                setSocket
            }}>
            { children }
        </UsuarioContext.Provider>
    )
}