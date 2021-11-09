import React,{ useState, useEffect, useContext } from 'react'
export default function ver_miembros(id_g){

    const [grupoinfo, setgrupoinfo] = useState([]);

    useEffect( async () =>{ 
        //event.preventDefault()
        const url = process.env.URL_BACKEND + '/grupo/getGrupo'
        const res = await fetch(url, {
          body: JSON.stringify({
            grupo_id: id_g
          }),
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          method: 'POST'
        })

        const json =  await res.json()
        setgrupoinfo(json.info_grupo)
        //console.log(json.info_grupo) 
    })

    return (
        <div style={{ color: 'white' }} >
            <h2>{grupoinfo.createdAt}</h2>
            <h1>{grupoinfo.nombre}</h1>
            <h3>{grupoinfo.descripcion}</h3>
            <p>Miembros</p>
        </div>
        
    )

}