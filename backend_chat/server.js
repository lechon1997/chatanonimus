import dotenv from 'dotenv'
import express from 'express';
import { createServer } from "http";
import cors from 'cors'
import { Server } from "socket.io";
import  routerUsuario from "./app/routes/usuario.js";
import  routerGrupo from "./app/routes/grupo.js";
import {initDB} from './config/db.js';
import { Usuario } from './app/models/usuario.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/usuario',routerUsuario)
app.use('/grupo',routerGrupo)

const server = createServer(app)
const port = process.env.PORT || 4000



server.listen(port,console.log('Server up'))



try{
    initDB()
}catch(err){
    console.log(err)
}


const io = new Server(server);

io.on("connection",  (socket) => {
    console.log(socket.id)

    socket.on('guardarSocket',  (data) => {
        console.log(data)
        Usuario.findByIdAndUpdate(data.usuario_id,{'socket_id':data.id_socket}, (error, data) => {
            !error ? console.log("Socket actualizado") : console.log("error socket")
        })

    })
    
    socket.on('nuevoComentario', (data) => {
        console.log(data.usuarioid)
    })

    socket.on('msg_frontend_to_backend', (data) => {
            //console.log(data)
            for(const u of data.usuarios){
                
                //const socketid_usuario = await Usuario.findById(u.usuario_id,'socket_id')
                socket.broadcast.emit("recibir_msg", {
                    mensaje:'hola :v'
                });
    
            }
    })

  });