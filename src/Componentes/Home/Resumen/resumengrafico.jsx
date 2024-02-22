import React, {useEffect, useState} from 'react';
import Generarpeticion from '../../../peticiones/apipeticiones';
import Handelstorage from '../../../Storage/handelstorage';
import Button from 'react-bootstrap/Button';
import { base64Decode } from 'base64-js';
import { Image } from 'antd';

import './resumengrafico.css'
function Resumengrafico({mes,anno}){
    const [imagen, setImagen] = useState(null);
    const [mostrar,setMostrar]=useState(false)

    const endpoint='http://127.0.0.1:8000/api/GraficoBalance/2024/2/'
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
        };
        cargardatos();
        
    }, []);
    
    const mostrardatos=async()=>{
        fetch(endpoint, requestOptions)
            .then(res => res.json())
            .then(data => {
                setImagen(data.imagen_grafico);  
            })
        setMostrar(true)
        console.log(imagen)
    }
      return(
        <div className='contenedor-imagen'>
                <h4 className='titulografico' > Relacion Ingreso-Egresos </h4> 
                
                <Image
                    src={`data:image/png;base64,${imagen}`}
                    width={'180%'}
                    height={'100%'}
                    style={{marginLeft:'-20%',marginTop:'-2.5%' } }
                    
                />
        
    

                {/* <img 
                src={`data:image/png;base64,${imagen}`}
                alt="Descripción de la imagen"
                
                className="img-resumen"
              /> */}
        
      </div>


    // <Image
    // width={600}
    // src={`data:image/png;base64,${imagen}`}
    // >
        
    // </Image>


    )


}
export default Resumengrafico