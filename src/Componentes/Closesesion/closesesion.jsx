import React, {useEffect, useState} from 'react';
import Handelstorage from '../../Storage/handelstorage';
import { Navigate, useNavigate } from "react-router-dom";

import { Spin } from 'antd';
import './closesesion.css'

function CloseSesion(){
    const navigate=useNavigate()
    const [mostrar, setMostrar]=useState(true)

    useEffect(() => {

        
        
        
        const cargardatos = async () => {
            Handelstorage('borrar')
            await new Promise(resolve => setTimeout(resolve, 5000))
            setMostrar(false)
            navigate('/Login')
          
        };
        cargardatos()
        
      }, []);

    if(mostrar){

        return(
            <div className='oscurecer-contenido'>
                <Spin size="large"/>
                <h6> Datos de sesion caducadas, cerrando sesion </h6>
            </div>
        )
    }

}
export default CloseSesion