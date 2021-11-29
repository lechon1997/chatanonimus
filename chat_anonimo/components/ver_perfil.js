import React,{ useState, useEffect, useContext } from 'react'
import jwt_decode from "jwt-decode";
export default function ver_perfil(id_usu){

    const [usuarioinfo, setusuarioinfo] = useState([]);
    const [img, setimg] = useState([]);
    const [entra, setentra] = useState(false);

    useEffect( async () =>{ 
        //event.preventDefault()
        const token = localStorage.getItem('token')
        const {usuario} = jwt_decode(token);

        const url = process.env.URL_BACKEND + '/usuario/'
        const res = await fetch(url, {
          body: JSON.stringify({
            id_usu: usuario.id
          }),
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          method: 'POST'
        })

        const json =  await res.json()
        setusuarioinfo(json)

        let fecha = json.usuario.createdAt.split("T");
        json.usuario.createdAt = fecha[0]

        let pathimg = process.env.URL_BACKEND + '/storage/imagenesUsuarios/' + json.usuario.foto
        setimg(pathimg)

        console.log(json)
        setentra(true)
    },[])

    if(entra){
        return (
        <div>
            <div style={{ color: 'white' }} >
                <div style={{ background: 'darkslategrey', padding: '15px' }} id="infousuario">
                    <img src={img} alt="foto de perfil" width="500" height="600"/>
                    <h1>{usuarioinfo.usuario.nickname}</h1>
                    <p>Nombre: {usuarioinfo.usuario.nombre}</p>
                    <p>Apellido: {usuarioinfo.usuario.apellido}</p>
                    <p>Celular: {usuarioinfo.usuario.celular}</p>
                    <p>Cuenta creada el {usuarioinfo.usuario.createdAt}sapee</p>
                </div>
            </div>
            <br />
        </div>
        )
    }else{
        return (
        <div>
        
        </div>
        )
    }
    

}