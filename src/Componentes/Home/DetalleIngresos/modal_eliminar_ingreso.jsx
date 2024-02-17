import React, {useEffect, useState} from 'react';
import { Button, Modal, Space } from 'antd';
import { DeleteOutlined,    RetweetOutlined  ,PlusCircleTwoTone  } from '@ant-design/icons';
import Generarpeticion from '../../../peticiones/apipeticiones';


function ModalEliminarIngreso({
  openeliminaringreso,
  setOpeneliminaringreso,
  setDataingresos,
  selectedRowKeys,
  setDataresumen

}
  ){
  const [titulo,setTitulo]=useState('')
  const [mensaje,setMensaje]=useState('')
  const [open, setOpen] = useState(openeliminaringreso);

  const showModal = () => {
    setOpen(true);
    setOpeneliminaringreso(false)
  };
  const handleOk = () => {
    setOpen(false);
    setOpeneliminaringreso(false)
  };
  const handleCancel = () => {
    setOpen(false);
    setOpeneliminaringreso(false)
  };
    
  const closemodal=()=>{
    setOpeneliminaringreso(false)
        
    }

  const eliminar= async ()=>{
    const datoseliminar = {
      ingresos:selectedRowKeys,};


    const endpoint='EliminarIngreso/'
    const result = await Generarpeticion(endpoint, 'POST', datoseliminar);
      
    const respuesta=result['resp']
    if (respuesta === 200) {
        await new Promise(resolve => setTimeout(resolve, 2000))
        const registros=result['data']
        setDataresumen(registros['Resumen'])
        setDataingresos(registros['Ingresos'])
        setOpeneliminaringreso(false)
        
    } else {
        
        
        // navigate('/');
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
                <Button onClick={eliminar}> Eliminar</Button>
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

export default ModalEliminarIngreso