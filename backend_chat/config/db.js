import mongoose from 'mongoose';

export function initDB() {
    const connect = () => {
        const DB_URI = process.env.DB_URI
        mongoose.connect(
            DB_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            (err) => {
                if(err){
                    console.log("DB: ERROR" + err.toString())
                }else{
                    console.log("CONEXIÓN CORRECTA")
                }
                
            }
        )
    }
    connect()

}
