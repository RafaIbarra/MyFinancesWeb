import React, {useEffect, useState} from 'react';
import {  Spin } from 'antd';
import { LoadingOutlined,SyncOutlined } from '@ant-design/icons';
import './cambiopassword.css'
function EnvioCorreo({correouser,enviandocorreo}){
  const [mostrarspin,setMostrarsprin]=useState(false)
  useEffect(() => {
        
    const cargardatos = () => {
      
      setMostrarsprin(enviandocorreo)
      };
      

    cargardatos();
  }, [enviandocorreo]);
    return(
      <div className=  'content-correo' >
          {!mostrarspin && (
            <p className='elementop'>Se enviara un correo a <strong><em>{`  ${(correouser)}`}. </em></strong> con el codigo de seguridad.</p>
          )}
          
          {!mostrarspin &&(
            <p className='elementop'>El codigo de seguridad tendra una validez de 15 minutos desde su envio </p>

          )}
          
          {mostrarspin &&(
             <div > 
               <Spin
                   
                   indicator={
                     <SyncOutlined
                       style={{
                         fontSize: 50,
                        //  color:'rgb(182, 212, 212)',
                        color:'Highlight',
                         fontWeight:'bold'
                         ,
                       }}
                       spin
                     />
                   }
                 />
                <p style={{fontWeight:'bold'}} > Enviando Correo </p>
             </div>

          )
          }
        </div>
    )

  }
export default EnvioCorreo