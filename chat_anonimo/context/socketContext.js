import React, { createContext, useState } from "react";

export const SocketContext = createContext();

export const SocketProvider = ({children}) => {

    const [socket_io, setSocket] = useState('')

    
 
    return (
        <SocketContext.Provider value={{
                socket_io,
                setSocket
            }}>
            { children }
        </SocketContext.Provider>
    )
}