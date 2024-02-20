import React, {useEffect, useState} from 'react';
import {Button,Form,Input,InputNumber,Radio,Modal } from 'antd';
import Generarpeticion from '../../peticiones/apipeticiones';
import { Navigate, useNavigate } from "react-router-dom";
import CerrarSesion from '../../App/cerrarsesion';

const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };

function ModalRegistroProducto({
    openregistroproducto,setOpenregistroproducto,setProductos,
    detalleseleccionproducto,modoedicionproducto,
    cargarcomponentesproductos,setCargarcomponentesproductos
}){

    const [open, setOpen] = useState(openregistroproducto);
    const [tituloproducto,setTituloproducto]=useState('')

    const [codigoproducto, setCodigoproducto]=useState(0)
    const [tipoproducto,setTipoproducto]=useState(0)
    const [nombreproducto,setNombreproducto]=useState('')

    const [valoresdefaultproducto,setValoresdefaultproducto]=useState([])
    const [marcaradiobuttonproducto,serMarcaradiobuttonproducto]=useState('0')

    const [modoactualizacionproducto,setModoactualizacionproducto]=useState(false)
    const [ready, setReady]=useState(false)
    


    const cargarvaloresdefault=()=>{
    
        if(Object.keys(detalleseleccionproducto).length>0){
  
            setCodigoproducto(detalleseleccionproducto[0]['id'])
            setTipoproducto(detalleseleccionproducto[0]['tipoproducto'])
            setNombreproducto(detalleseleccionproducto[0]['nombre_producto'])
            
            
            setModoactualizacionproducto(true)     
            setValoresdefaultproducto(detalleseleccionproducto)

            if(detalleseleccionproducto[0]['DescripcionTipoProducto']==='Fijo'){
                serMarcaradiobuttonproducto('1')
            
            
            }else{
                serMarcaradiobuttonproducto('2')
            
            
            }
            
            if(modoedicionproducto===false){
            
                setTituloproducto('ACTUALIZAR EL PRODUCTO')
            }
            else{
                setTituloproducto('DETALLE DEL PRODUCTO')
            }
    
    
        }else{
            setCodigoproducto(0)
            setTituloproducto('AGREGAR UN NUEVO PRODUCTO')
        }
    
        
      }

    const closemodal=()=>{
        setOpenregistroproducto(false)
        setOpenregistroproducto(false)
        setOpen(false)
        }
    const showModal = () => {
        setOpen(true);
        setOpenregistroproducto(false)
        };
    const handleOk = () => {
        setOpen(false);
        setOpenregistroproducto(false)
        };

    const handleCancel = () => {
        setOpen(false);
        setOpenregistroproducto(false)
        };


    const selecciontipoproducto=(event)=>{
            const valor=parseInt(event.target.value)
            setTipoproducto(valor)
            
            
        }
    const cargar_nombre_producto=(event)=>{
        setNombreproducto(event.target.value)

    }

    const registro_producto = async () => {
        
        const datosregistrar = {
            codigoproducto:codigoproducto,
            tipoproducto:tipoproducto,
            nombre:nombreproducto
        

        };
        const endpoint='RegistroProductoFinanciero/'
        const result = await Generarpeticion(endpoint, 'POST', datosregistrar);
        
        const respuesta=result['resp']
        if (respuesta === 200) {
          await new Promise(resolve => setTimeout(resolve, 2000))
          const registros=result['data']
          setProductos(registros)
          setCargarcomponentesproductos(!cargarcomponentesproductos)
          setOpenregistroproducto(false)
          
        } else if(respuesta === 403 || respuesta === 401){
            CerrarSesion()
            navigate('/')

        }
      };

    useEffect(() => {
    
            const cargardatos =  () => {
              
              
                
                cargarvaloresdefault()
                setReady(true)
                
            };
        
            cargardatos();
          }, []);
            
          
    if(ready){
            return(
                <div>
                    <Modal
                    
                    open={open}
                    title={tituloproducto}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        {!modoedicionproducto && (<Button onClick={closemodal}> Cancelar</Button>)}
                        {!modoedicionproducto && ( <Button type="primary" onClick={registro_producto}>Registrar</Button>)} 
                        {modoedicionproducto && (<Button onClick={closemodal}> Cerrar</Button>)}
                    </>
                    )}
                    >

                        <Form
                            {...formItemLayout}
                            variant="filled"
                            style={{
                            maxWidth: 600,
                            }}
                        >   

                            <Form.Item label="Cod Producto"name="CodProducto">
                                    
                                    <InputNumber 
                                        defaultValue={modoactualizacionproducto ? valoresdefaultproducto[0]['id'] : 0} 
                                        style={{width: '100%',}} disabled /> 
                            </Form.Item>

                            <Form.Item label="Tipo Producto">
                                <Radio.Group onChange={selecciontipoproducto} defaultValue={marcaradiobuttonproducto}>
                                <Radio value="1" disabled={modoedicionproducto}> Fijo </Radio>
                                <Radio value="2" disabled={modoedicionproducto} > Ocasionales </Radio>
                                </Radio.Group>
                            </Form.Item>

                            
                            <Form.Item label="Nombre Producto" name="NombreProducto"
                                    rules={[{
                                        required: true,
                                        message: 'Ingrese el nombre del producto!',
                                            },]}
                                >
                                    <Input 
                                            placeholder="Nombre Producto"
                                            onChange={cargar_nombre_producto}
                                            disabled={modoedicionproducto}
                                            defaultValue={modoactualizacionproducto ? valoresdefaultproducto[0]['nombre_producto'] : ''} 
                                    />
                                </Form.Item>

                            

                            {modoactualizacionproducto && (
                                <Form.Item
                                    label="Fecha Registro"
                                    name="FechaRegistro"
                                    disabled 
                                    
                                    >
                                    
                                    <InputNumber defaultValue={valoresdefaultproducto[0]['fecha_registro'] }
                                        style={{width: '100%',}} disabled /> 
                                    </Form.Item>

                                )
                                }


                            


                        </Form>

                    </Modal>



                
                </div>

            )
        }

}

export default ModalRegistroProducto