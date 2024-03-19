import React from 'react';
import './piepagina.css'
function PiePagina(){
    return(
        <div className='container-pie'>

            <div className='cuadro-contactos'>
                {/* <p className='letra-contacto'> Informacion del desarrollador </p> */}
                <p className='letra-contacto'> © Todos los derechos reservados - Rafael Ibarra </p>
                <img style={{paddingLeft:'50px'}} className="estiloimg-pie"
                                            
                    src= "/gmail2.svg"
                    alt="login-icon"
                   
                />
                <a  className='enlace'  style={{paddingLeft:'7px'}} href="mailto:blasrafael1986@gmail.com" target="_blank">blasrafael1986@gmail.com</a>

                <img style={{paddingLeft:'50px'}} className="estiloimg-pie"
                                            
                    src= "/github1.svg"
                    alt="login-icon"
                    
                />
                <a className='enlace' href="https://github.com/RafaIbarra" target="_blank">RafaIbarra</a>

                <img style={{paddingLeft:'50px'}} className="estiloimg-pie-wha"src= "/whatsapp3.svg" alt="login-icon"/>
                <a className='enlace' href="https://wa.me/595994203597?text=Hola%2C%20una%20consulta" target="_blank">
                        +59594203597
                </a>

            </div>

        </div>
    )

}
export default PiePagina