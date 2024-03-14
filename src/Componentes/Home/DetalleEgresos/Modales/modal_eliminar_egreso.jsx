import React, {useEffect, useState} from 'react';
import { Button, Modal, Space } from 'antd';
import { DeleteOutlined,    RetweetOutlined  ,PlusCircleTwoTone  } from '@ant-design/icons';
import { Navigate, useNavigate } from "react-router-dom";

import Generarpeticion from '../../../../peticiones/apipeticiones'


function ModalEliminarEgreso({openeliminaregreso,setOpeneliminaregreso,
  setDataegresos,setDataresumen,selectedRowKeys,setImgresumen,setImgegresos})
  {
  const navigate=useNavigate()
  const [titulo,setTitulo]=useState('')
  const [mensaje,setMensaje]=useState('')
  const [open, setOpen] = useState(openeliminaregreso);

  const showModal = () => {
    setOpen(true);
    setOpeneliminaregreso(false)
  };
  const handleOk = () => {
    setOpen(false);
    setOpeneliminaregreso(false)
  };
  const handleCancel = () => {
    setOpen(false);
    setOpeneliminaregreso(false)
  };
    
  const closemodal=()=>{
    setOpeneliminaregreso(false)
        
    }

  const eliminar= async ()=>{
    const datoseliminar = {
      gastos:selectedRowKeys,};


    const endpoint='EliminarEgreso/'
    const result = await Generarpeticion(endpoint, 'POST', datoseliminar);
      
    const respuesta=result['resp']
    if (respuesta === 200) {
        
        const registros=result['data']['datos']
        setDataresumen(registros['Resumen'])
        setDataegresos(registros['Egresos'])

        const registros_imagenes=result['data']['graficos']
        setImgresumen(registros_imagenes['imgResumen'])
        setImgegresos(registros_imagenes['imgEgresos'])

        setOpeneliminaregreso(false)
        
    } else if(respuesta === 403 || respuesta === 401){
      
      navigate('/Closesesion')

  }
  
  }


  useEffect(() => {
      const titulos=()=>{
        if(selectedRowKeys.length>1){
          setTitulo('ELIMINAR REGISTROS')
          setMensaje('Desea eliminar estos ' + selectedRowKeys.length.toString() + ' registros?' )
          
        }
        else{
          setTitulo('ELIMINAR REGISTRO')
          setMensaje('Desea eliminar el registro' )
        }
        
      }
      titulos()
      
    }, []);
  
    return(
        <div >

            <Modal
            icon={<DeleteOutlined/>} 
            open={open}
            title={titulo}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={(_, { OkBtn, CancelBtn }) => (
            <>
                <Button onClick={closemodal}> Cancelar</Button>
                <Button type="primary" onClick={eliminar}> Eliminar</Button>
                {/* <CancelBtn />
                <OkBtn /> */}
            </>
            )}
        >
            <p> {mensaje}</p>
            
        </Modal>
        </div>
    )

}

export default ModalEliminarEgreso