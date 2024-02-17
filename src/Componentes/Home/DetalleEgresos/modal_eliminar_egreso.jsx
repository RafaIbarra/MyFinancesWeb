import React, {useEffect, useState} from 'react';
import { Button, Modal, Space } from 'antd';
import { DeleteOutlined,    RetweetOutlined  ,PlusCircleTwoTone  } from '@ant-design/icons';
import Generarpeticion from '../../../peticiones/apipeticiones';


function ModalEliminarEgreso({openeliminaregreso,setOpeneliminaregreso,
  setDataegresos,
  setDataresumen,selectedRowKeys})
  {
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
        await new Promise(resolve => setTimeout(resolve, 2000))
        const registros=result['data']
        setDataresumen(registros['Resumen'])
        setDataegresos(registros['Egresos'])
        setOpeneliminaregreso(false)
        
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

export default ModalEliminarEgreso