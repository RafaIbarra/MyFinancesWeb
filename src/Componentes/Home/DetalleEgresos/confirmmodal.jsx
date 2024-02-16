import React, {useEffect, useState} from 'react';
import { Button, Modal, Space } from 'antd';
import { DeleteOutlined,    RetweetOutlined  ,PlusCircleTwoTone  } from '@ant-design/icons';
import Generarpeticion from '../../../peticiones/apipeticiones';


function Modalconfirm({openmodalconfirm,setOpenmodalconfirm,cargaregresos,setCargarEgresos,selectedRowKeys}){
  const [titulo,setTitulo]=useState('')
  const [mensaje,setMensaje]=useState('')
  const [open, setOpen] = useState(openmodalconfirm);

  const showModal = () => {
    setOpen(true);
    setOpenmodalconfirm(false)
  };
  const handleOk = () => {
    setOpen(false);
    setOpenmodalconfirm(false)
  };
  const handleCancel = () => {
    setOpen(false);
    setOpenmodalconfirm(false)
  };
    
  const closemodal=()=>{
        setOpenmodalconfirm(false)
        
    }

  const eliminar= async ()=>{
    const datoseliminar = {
      gastos:selectedRowKeys,};


    const endpoint='EliminarEgreso/'
    const result = await Generarpeticion(endpoint, 'POST', datoseliminar);
      
    const respuesta=result['resp']
    if (respuesta === 200) {
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        setCargarEgresos(!cargaregresos)
        setOpenmodalconfirm(false)
        
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

export default Modalconfirm