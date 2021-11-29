import React,{ useState, useEffect, useContext } from 'react'
import { Image } from 'react';
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

        if(json.info_grupo.hasOwnProperty('foto')){
            json.info_grupo.foto = '/storage/imagenesGrupo/' + json.info_grupo.foto
        }else{
            json.info_grupo.foto = '/storage/imagenesGrupo/default.png'
        }

        console.log(json.info_grupo)
        setgrupoinfo(json.info_grupo)

        //recorro los miebros y los listo
        const datos_miembros = json.miembros
        const miembros = document.getElementById("miembros");
        console.log(datos_miembros)
        for (const miembro of datos_miembros) {
            let p = document.createElement("li")
            p.className = "list-group-item list-group-item-secondary border border-1 border-success bg-dark text-light"
            miembros.append(p)

            let img = document.createElement("img")
            img.src = miembro.[0].foto
            img.className = "w-25 me-3 border border-5 border-success rounded-circle"

            p.append(img)
            p.append(miembro.[0].nickname+": ")
            //p.append(" - ")
            p.append(miembro.[0].rol+" ")

            if(miembro.[0].admin != ""){
                //p.append(" - ")
                p.append("("+miembro.[0].admin+")")
            }
        }
    },[])

    return (
        <div>
            <div style={{ color: 'white' }} >
                <div style={{ padding: '15px' }} className="bg-dark" id="infogrupo">
                    <h2>{grupoinfo.createdAt}</h2>
                    <div className="d-flex">
                        <div style={{ width: '500px' , height: '300px' }}>
                            <img className="img-thumbnail fill W-100"  style={{ width: '500px' , height: '300px' }}  src={grupoinfo.foto} />
                        </div>

                        <div className="w-75 m-4">
                            <h1>{grupoinfo.nombre}</h1>
                            <h3>{grupoinfo.descripcion}</h3>
                        </div>
                    </div>

                </div>

                <div className="bg-dark" style={{ padding: '15px' }}>

                    <h3><p>Miembros</p></h3>

                    <ul className="list-group w-25 m-1"  id="miembros">
                    </ul>

                </div>

            </div>

        </div>
        
        )

}