import dotenv from 'dotenv'
import express from 'express';
import { createServer } from "http";
import cors from 'cors'
import { Server } from "socket.io";
import  routerUsuario from "./app/routes/usuario.js";
import  routerGrupo from "./app/routes/grupo.js";
import {initDB} from './config/db.js';

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/usuario',routerUsuario)
app.use('/grupo',routerGrupo)

const server = createServer(app)
const port = process.env.PORT || 4000

const io = new Server(server);

io.on("connection", (socket) => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx

    socket.on('nuevoComentario', (data) => {
        console.log(data)
    })

  });

server.listen(port,console.log('Server up'))



try{
    initDB()
}catch(err){
    console.log(err)
}
