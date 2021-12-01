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
            p.className = "list-group-item list-group-item-secondary border-bottom bg-dark text-light"
            miembros.append(p)

            let img = document.createElement("img")
            img.src = miembro.[0].foto
            img.style ="float: left"
            img.className = "w-25 me-3 border border-5 border-success rounded-circle"
            p.append(img)

            let nick = document.createElement("label")
            nick.className = "mt-3"
            nick.append(miembro.[0].nickname)
            p.append(nick)

            if(miembro.[0].rol == "Super administrador"){
                p.innerHTML += "<svg aria-hidden='true' style='width: 15% ; float: right' focusable='false' data-prefix='fas' data-icon='users-crown' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512' className='svg-inline--fa fa-users-crown fa-w-20 fa-2x'> <path fill='currentColor' d='M96 224c35.35 0 64-28.65 64-64s-28.65-64-64-64-64 28.65-64 64 28.65 64 64 64zm224 32c53.02 0 96-42.98 96-96v-16H224v16c0 53.02 42.98 96 96 96zm256 0h-64c-17.59 0-33.5 7.11-45.07 18.59 40.27 22.06 68.86 62.03 75.13 109.41H608c17.67 0 32-14.33 32-32v-32c0-35.35-28.65-64-64-64zm-402.93 18.59C161.5 263.11 145.59 256 128 256H64c-35.35 0-64 28.65-64 64v32c0 17.67 14.33 32 32 32h65.94c6.27-47.38 34.85-87.34 75.13-109.41zM544 224c35.35 0 64-28.65 64-64s-28.65-64-64-64-64 28.65-64 64 28.65 64 64 64zm-147.2 64h-8.31c-20.84 9.96-43.89 16-68.49 16s-47.64-6.04-68.49-16h-8.31C179.58 288 128 339.58 128 403.2V432c0 26.51 21.49 48 48 48h288c26.51 0 48-21.49 48-48v-28.8c0-63.62-51.58-115.2-115.2-115.2zM416 32l-48 24-48-24-48 24-48-24v80h192V32z' ></path></svg>"
            }else if(miembro.[0].admin != ""){
                p.innerHTML += "<svg aria-hidden='true' style='width: 15% ; float: right' focusable='false' data-prefix='fas' data-icon='user-cog' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512' className='svg-inline--fa fa-user-cog fa-w-20 fa-2x'><path fill='currentColor' d='M610.5 373.3c2.6-14.1 2.6-28.5 0-42.6l25.8-14.9c3-1.7 4.3-5.2 3.3-8.5-6.7-21.6-18.2-41.2-33.2-57.4-2.3-2.5-6-3.1-9-1.4l-25.8 14.9c-10.9-9.3-23.4-16.5-36.9-21.3v-29.8c0-3.4-2.4-6.4-5.7-7.1-22.3-5-45-4.8-66.2 0-3.3.7-5.7 3.7-5.7 7.1v29.8c-13.5 4.8-26 12-36.9 21.3l-25.8-14.9c-2.9-1.7-6.7-1.1-9 1.4-15 16.2-26.5 35.8-33.2 57.4-1 3.3.4 6.8 3.3 8.5l25.8 14.9c-2.6 14.1-2.6 28.5 0 42.6l-25.8 14.9c-3 1.7-4.3 5.2-3.3 8.5 6.7 21.6 18.2 41.1 33.2 57.4 2.3 2.5 6 3.1 9 1.4l25.8-14.9c10.9 9.3 23.4 16.5 36.9 21.3v29.8c0 3.4 2.4 6.4 5.7 7.1 22.3 5 45 4.8 66.2 0 3.3-.7 5.7-3.7 5.7-7.1v-29.8c13.5-4.8 26-12 36.9-21.3l25.8 14.9c2.9 1.7 6.7 1.1 9-1.4 15-16.2 26.5-35.8 33.2-57.4 1-3.3-.4-6.8-3.3-8.5l-25.8-14.9zM496 400.5c-26.8 0-48.5-21.8-48.5-48.5s21.8-48.5 48.5-48.5 48.5 21.8 48.5 48.5-21.7 48.5-48.5 48.5zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm201.2 226.5c-2.3-1.2-4.6-2.6-6.8-3.9l-7.9 4.6c-6 3.4-12.8 5.3-19.6 5.3-10.9 0-21.4-4.6-28.9-12.6-18.3-19.8-32.3-43.9-40.2-69.6-5.5-17.7 1.9-36.4 17.9-45.7l7.9-4.6c-.1-2.6-.1-5.2 0-7.8l-7.9-4.6c-16-9.2-23.4-28-17.9-45.7.9-2.9 2.2-5.8 3.2-8.7-3.8-.3-7.5-1.2-11.4-1.2h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c10.1 0 19.5-3.2 27.2-8.5-1.2-3.8-2-7.7-2-11.8v-9.2z' ></path></svg>"
            }

            let r = document.createElement("label")
            r.className ="fst-italic text-secondary"
            r.append(miembro.[0].rol)
            let linebreak = document.createElement("br")
            p.append(linebreak)
            p.append(r)

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

                <div className="bg-gray" style={{ padding: '15px' }}>

                    <h3><p>Miembros</p></h3>
                        
                    <ul className="list-group w-25 m-1"  id="miembros">
                    </ul>

                </div>

            </div>

        </div>
        
        )

}