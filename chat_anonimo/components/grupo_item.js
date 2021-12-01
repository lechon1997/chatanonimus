import React,{ useState, useEffect, useContext } from 'react'
import { UsuarioContext } from '../context/usuarioContext'
import Grupo from './grupo'

export default function Grupo_item({nombreGrupo, descGrupo, cambiarGrupo,id, setVistaC,mensajesNuevos}){
    const {  setIdGrupovista, setVistaGrupo } = useContext(UsuarioContext)

    const [img, setimg] = useState([]);

    useEffect( async () =>{ 
        
        const url = process.env.URL_BACKEND + '/grupo/getfoto'
        const res = await fetch(url, {
          body: JSON.stringify({
            grupo_id: id
          }),
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          method: 'POST'
        })

        const json =  await res.json()

        let pathimg

        if(json.foto){
            pathimg = '/storage/imagenesGrupo/' + json.foto
        }else{
            pathimg = '/storage/imagenesGrupo/default.png'
        }
        setimg(pathimg)

    },[])

    return (
        <div onClick={ () =>{ setVistaC(<Grupo id={id}/>); setVistaGrupo(''); setIdGrupovista(id) }} className="Grupo">
						
            {/* DIV IMAGEN DEL GRUPO*/}
            <div className="div_imagen_grupo">
                <img style={{ width: '250px' , height: '250px' }} className="w-100 border border-5 border-primary rounded-circle" src={img} />
            </div>

            {/* DIV INFO GRUPO*/}
            <div className="">
                <p className="m-0 mb-1 ms-3 nombre_grupo">{ nombreGrupo }</p>
                <div className="mensajitos_para_decorar_xd">
                    <p className="ms-3 mensaje_en_div_grupo">{ descGrupo }</p>
                    {
                      mensajesNuevos!=0 ? <p className="ms-3 mensaje_en_div_grupo mensajes_sin_leer">{ mensajesNuevos > 1 ? `${mensajesNuevos} comentarios nuevos` : `${mensajesNuevos} comentario nuevo` }</p> : ''
                    }
                    
                </div>
                
            </div>
        </div>
        
    )

}