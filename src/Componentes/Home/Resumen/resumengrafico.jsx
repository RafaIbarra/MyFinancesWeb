import React, {useEffect, useState} from 'react';
import Generarpeticion from '../../../peticiones/apipeticiones';
import Handelstorage from '../../../Storage/handelstorage';
import Button from 'react-bootstrap/Button';
import { base64Decode } from 'base64-js';
import { Image } from 'antd';

import './resumengrafico.css'
function Resumengrafico({dataresumen}){
    const [imagen, setImagen] = useState(null);
    const [mostrar,setMostrar]=useState(false)
    const datestorage=Handelstorage('obtenerdate');
    const mes_storage=datestorage['datames']
    const anno_storage=datestorage['dataanno']

    const endpoint='http://127.0.0.1:8000/api/GraficoBalance/' + anno_storage + '/' + mes_storage +'/'
    let requestOptions = {};
    let bodyoptions = {};
    const datosstarage=Handelstorage('obtener');
    const tokenstorage=datosstarage['token']
    const sesionstorage=datosstarage['sesion']
    bodyoptions.SESION=sesionstorage;
    requestOptions = {
        method:'POST',
        headers: {  'Content-Type': 'application/json',
                    
                    'Authorization':`Bearer ${tokenstorage}`,
                },
        body: JSON.stringify(bodyoptions)
        }
      
    useEffect(() => {
        const cargardatos =async()=>{
            fetch(endpoint, requestOptions)
            .then(res => res.json())
            .then(data => {
                setImagen(data.imagen_grafico);
                
            })
            setMostrar(true)
        };
        cargardatos();
        
    }, [dataresumen]);
    
    const mostrardatos=async()=>{
        fetch(endpoint, requestOptions)
            .then(res => res.json())
            .then(data => {
                setImagen(data.imagen_grafico);  
            })
        setMostrar(true)
        console.log(imagen)
    }
    if(mostrar){
     
        

        return(
            <div className='contenedor-principal-resumen'>
                <h4 className='titulo-grafico-resumen' > Relacion Ingreso-Egresos </h4> 
                
                <div className='contenedor-imagen-resumen'>
    
                    <img 
                    src={`data:image/png;base64,${imagen}`}
                    alt="Descripción de la imagen"
                    
                    className="imagen-resumen"
                    />
                </div>
            
          </div>
    
    
      
    
        )

    }  


}
export default Resumengrafico