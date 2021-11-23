
export default function Mensaje({mensaje}){
    const date = new Date;
    const minutes = date.getMinutes();
    const hour = date.getHours();
    return (
        <div className="posicion_mi_mensaje">
            <div className="estilos_mi_mensaje">
                <div>
                    <p className="text-break">{mensaje.msg}</p>
                </div>
                <div className="acomodando_la_hora_xd">
                    <p>{hour + ":" + minutes}</p>
                </div>
            </div>
        </div>
        
    )

}