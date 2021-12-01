import React,{ useState, useEffect } from 'react'

export default function Cabecera_grupo({ Grupo, ComentariosNuevos }){
    const [img, setimg] = useState([]);

    useEffect( async () =>{ 

        let pathimg

        if(Grupo.foto){
            pathimg = '/storage/imagenesGrupo/' + Grupo.foto
        }else{
            pathimg = '/storage/imagenesGrupo/default.png'
        }

        setimg(pathimg)

    })

    return (
        <div className="cabecera_div_mensajes">
					
			{/* DIV IMAGEN DEL GRUPO*/}
            <div className="imagen_grupo_en_cabecera_mensajes">
                <img className="rounded-circle w-100" src={img} />
            </div>

            {/* DIV INFO GRUPO*/}
            <div className="">
                <p className="m-0 ms-3 nombre_grupo">{Grupo.nombre}</p>
                <p className="ms-3 mensaje_en_div_grupo">4 miembros</p>
                
            </div>
        </div>
        
    )

}

