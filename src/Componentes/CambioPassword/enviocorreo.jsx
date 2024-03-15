import React from 'react';
import './cambiopassword.css'
function EnvioCorreo({correouser}){
    return(
      <div className='content-correo'>
          <p className='elementop'>Se enviara un correo a <strong><em>{`  ${(correouser)}`}. </em></strong> con el codigo de seguridad.</p>
          <p className='elementop'>El codigo de seguridad tendra una validez de 15 minutos desde su envio </p>
        </div>
    )

  }
export default EnvioCorreo