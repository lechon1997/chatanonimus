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

        //listo la info del grupo
        const json =  await res.json()

        let fecha = json.info_grupo.createdAt.split("T");
        json.info_grupo.createdAt = fecha[0]

        console.log(json.info_grupo)
        setgrupoinfo(json.info_grupo)

        const divgrupoinfo = document.getElementById("infogrupo");
        let img = document.createElement("img")
        //img.src = process.env.URL_BACKEND + '/storage/imagenesGrupo/' + json.info_grupo.foto
        //divgrupoinfo.append(img)

        //recorro los miebros y los listo
        const datos_miembros = json.miembros
        const miembros = document.getElementById("miembros");
        
        for (const miembro of datos_miembros) {
            let p = document.createElement("p")
            miembros.append(p)
            p.append(miembro.[0].nickname)
            p.append(" - ")
            p.append(miembro.[0].rol)
            if(miembro.[0].admin != ""){
                p.append(" - ")
                p.append(miembro.[0].admin)
            }
        }
    },[])

    return (
        <div style={{ color: 'white' }} >
            <div style={{ background: 'darkslateblue', padding: '15px' }} id="infogrupo">
                <h2>{grupoinfo.createdAt}</h2>
                <h1>{grupoinfo.nombre}</h1>
                <h3>{grupoinfo.descripcion}</h3>
            </div>
            <div  style={{ background: 'dimgray', padding: '5px' }} id="miembros">
                <h3><p>Miembros</p></h3>
            </div>
        </div>
        
    )

}