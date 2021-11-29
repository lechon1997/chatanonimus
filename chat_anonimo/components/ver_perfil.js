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

        let pathimg
        console.log(json.usuario)
        if(json.usuario.hasOwnProperty('foto')){
            pathimg = '/storage/imagenesUsuarios/' + json.usuario.foto
        }else{
            pathimg = '/storage/imagenesUsuarios/default.png'
        }

        setimg(pathimg)

        console.log(json)
        setentra(true)
    },[])

    if(entra){
        return (

    <div className="card text-dark mb-2" style={{ width: '18rem' }} >
        <div className="bg-dark p-4">
            <img className="card-img-top border border-5 border-success rounded-circle" src={img} alt="foto de perfil" />
        </div>
        <div className="card-body">
          <h5 className="card-title">{usuarioinfo.usuario.nickname}</h5>
          <p className="card-text">Nombre: {usuarioinfo.usuario.nombre}</p>
          <p className="card-text">Apellido: {usuarioinfo.usuario.apellido}</p>
          <p className="card-text">Celular: {usuarioinfo.usuario.celular}</p>
          <div className="card-footer">
            <small className="text-muted">Cuenta creada el {usuarioinfo.usuario.createdAt}</small>
          </div>
        </div>
    </div>

        )
    }else{
        return (
        <div>
        
        </div>
        )
    }
    

}