import React, {useEffect, useState} from 'react';

import {Button,Form,Input,InputNumber,Select,Radio,Modal } from 'antd';
import {DatePicker } from 'antd';
import Generarpeticion from '../../../peticiones/apipeticiones';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';


const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
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
 
  

function ModalRegistroIngreso({
  openregistroingreso,setOpenregistroingreso,cargaringresos,
  setCargaringresos,setDataresumen

}){

  const [open, setOpen] = useState(openregistroingreso);

  
    const { MonthPicker, RangePicker } = DatePicker;
    dayjs.extend(customParseFormat);
    const dateFormat = 'YYYY-MM-DD';
    const [fechaegreso, setFechaegreso] = useState(null);
    const[datosproductos,setDatosproductos]=useState(null)
    const[productosfijos,setProductosfijos]=useState(null)
    const[productosocacionales,setProductosocacionales]=useState(null)
    const[productosel,setProductosel]=useState(0)
    const[monto,setMonto]=useState(0)
    const[anotacion,setAnotacion]=useState('')

    const showModal = () => {
      setOpen(true);
      setOpenregistroingreso(false)
    };
    const handleOk = () => {
      setOpen(false);
      setOpenregistroingreso(false)
    };
    const handleCancel = () => {
      setOpen(false);
      setOpenregistroingreso(false)
    };
      
    const closemodal=()=>{
      setOpenregistroingreso(false)
      setOpenregistroingreso(false)
      }


    useEffect(() => {
    
        const cargardatos = async () => {
          const body = {};
          const endpoint='MisProductosFinancieros/'
          const result = await Generarpeticion(endpoint, 'POST', body);
          
          const respuesta=result['resp']
          if (respuesta === 200) {
            // setDatosgastos(result['data'])
            const lista=result['data']
            const listafijos = lista.filter((fij) => fij.tipoproducto === 1);
            const listasocacionales = lista.filter((oca) => oca.tipoproducto === 2);
            setProductosfijos(listafijos)
            setProductosocacionales(listasocacionales)
            
            
          } else {
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            // navigate('/');
          }
        };
    
        cargardatos();
      }, []);





    const tipoproducto=(event)=>{
        setProductosel(null)
        setProductosel(0)
        
        const valor=parseInt(event.target.value)
        if (valor===1){
          
          setDatosproductos(productosfijos)
        }else if(valor===2){
          
          setDatosproductos(productosocacionales)
        }
        
      }
    const seleccionproducto=(value)=>{
          const valor= value;
          
          setProductosel(valor)
  
      }
    const seleccionarmonto=(value)=>{
          const valor= value;
          
          setMonto(valor)
  
      }
    const seleccionaranotacion=(event)=>{
          const valor= event.target.value;
          
          setAnotacion(valor)
  
      }
    const seleccionfecha=(date, dateString)=> {
        
        setFechaegreso(dateString)
      }
    const registrar_ingreso = async () => {
        
          const datosregistrar = {
              producto:productosel,
              monto:monto,
              fecha:fechaegreso,
              anotacion:anotacion,
              
  
          };
          const endpoint='RegistroIngreso/'
          const result = await Generarpeticion(endpoint, 'POST', datosregistrar);
          
          const respuesta=result['resp']
          if (respuesta === 200) {
            await new Promise(resolve => setTimeout(resolve, 2000))
            setDataresumen(result['data'])
            setCargaringresos(!cargaringresos)
            setOpenregistroingreso(false)
            
          } else {
            
            
            // navigate('/');
          }
        };



    return(
        <div >

            <Modal
            
            open={open}
            title="AGREGAR REGISTRO INGRESO"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={(_, { OkBtn, CancelBtn }) => (
            <>
                <Button onClick={closemodal}> Cancelar</Button>
                <Button onClick={closemodal}> Eliminar</Button>
                {/* <CancelBtn />
                <OkBtn /> */}
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
                <Form.Item label="Categoria">
                  <Radio.Group onChange={tipoproducto}>
                    <Radio value="1"> Fijo </Radio>
                    <Radio value="2"> Ocacionales </Radio>
                  </Radio.Group>
                </Form.Item>

                
                <Form.Item label="Ingreso"name="Ingreso"
                            rules={[
                                {
                                required: true,
                                message: 'Please input!',
                                },
                            ]}
                >
                    <Select name="listaproductos"
                            value={productosel}
                            onChange={seleccionproducto }
                    >
                         <Select.Option value="">Seleccionar </Select.Option>
                         {datosproductos &&  datosproductos.map((g) => (
                             <Select.Option key={g.id} value={g.id}>
                                 {g.nombre_producto}
                             </Select.Option>
                         ))}
                    </Select>
                    
                </Form.Item>
                
                

                <Form.Item
                    label="Fecha Ingreso"
                    name="DatePicker"
                    rules={[
                        {
                        required: true,
                        message: 'Please input!',
                        },
                    ]}
                    >
                    <DatePicker 
                        placeholder='Fecha Ingreso'
                        dateFormat="yyyy-MM-dd"
                        onChange={seleccionfecha}
                        // onChange={onChange}
                        
                        >

                    </DatePicker>
                </Form.Item>
                
            
                

                <Form.Item
                    label="Monto Ingreso"
                    name="MontoIngreso"
                    rules={[
                        {
                        required: true,
                        message: 'Please input!',
                        },
                    ]}
                    >
                    <InputNumber
                        onChange={seleccionarmonto}
                        style={{
                        width: '100%',
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="Anotacion"
                    name="Anotacion"
                    rules={[
                        {
                        required: false,
                        message: '',
                        },
                    ]}
                    >
                    <Input.TextArea onChange={seleccionaranotacion}/>
                </Form.Item>


                <Form.Item
                    wrapperCol={{
                        offset: 6,
                        span: 16,
                    }}
                    >
                   <Button type="primary" onClick={registrar_ingreso}>Registrar</Button>
                </Form.Item>


            </Form>
        </Modal>
        </div>
    )

}

export default ModalRegistroIngreso