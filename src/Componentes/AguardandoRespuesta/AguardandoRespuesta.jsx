import React, {useEffect, useState} from 'react';
import {  Spin } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import './aguardandorespuesta.css'
function AguardandoRespuesta(){
    return(
        <div className='oscurecer-contenido-respuesta'> 
               <Spin
                   
                   indicator={
                     <SyncOutlined
                       style={{
                         fontSize: 50,
        
                        color:'Highlight',
                         fontWeight:'bold'
                         ,
                       }}
                       spin
                     />
                   }
                 />
                <p style={{fontWeight:'bold'}} > Procesando </p>
             </div>
    )
} 

export default AguardandoRespuesta