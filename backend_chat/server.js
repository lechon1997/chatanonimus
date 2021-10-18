import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors'
import  routerUsuario from "./app/routes/usuario.js";
import {initDB} from './config/db.js';

dotenv.config()
const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json());
app.use('/usuario',routerUsuario)
app.listen(port,console.log('Server On'))
initDB()