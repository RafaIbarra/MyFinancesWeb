import React, {useEffect, useState} from 'react';
import { Button, Modal, Space } from 'antd';
import { DeleteOutlined,    RetweetOutlined  ,PlusCircleTwoTone  } from '@ant-design/icons';
import Generarpeticion from '../../peticiones/apipeticiones';
import { Navigate, useNavigate } from "react-router-dom";

function ModalEliminarProducto(
    {
        openeliminarproducto,
        setOpeneliminarproducto,
        selectedRowKeys,
        cargarcomponentesproductos,setCargarcomponentesproductos
    }
){
    const navigate=useNavigate()
    const [titulo,setTitulo]=useState('')
    const [mensaje,setMensaje]=useState('')
    const [open, setOpen] = useState(openeliminarproducto);

    const showModal = () => {
        setOpen(true);
        setOpeneliminarproducto(false)
      };
    const handleOk = () => {
        setOpen(false);
        setOpeneliminarproducto(false)
      };
    const handleCancel = () => {
        setOpen(false);
        setOpeneliminarproducto(false)
      };
        
    const closemodal=()=>{
        setOpeneliminarproducto(false)
            
        }

    const eliminar= async ()=>{
            const datoseliminar = {
                productos:selectedRowKeys,};
        
        
            const endpoint='EliminarProductos/'
            const result = await Generarpeticion(endpoint, 'POST', datoseliminar);
              
            const respuesta=result['resp']
            if (respuesta === 200) {
                
                setCargarcomponentesproductos(!cargarcomponentesproductos)
                setOpeneliminarproducto(false)
                
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

export default ModalEliminarProducto