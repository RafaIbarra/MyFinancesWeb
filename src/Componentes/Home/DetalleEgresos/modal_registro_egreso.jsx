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
 
  

function ModalRegistroEgreso({openregistroegreso,setOpenregistroegreso,cargaregresos,setCargarEgresos,setDataresumen}){

  const [open, setOpen] = useState(openregistroegreso);

  
    const { MonthPicker, RangePicker } = DatePicker;
    dayjs.extend(customParseFormat);
    const dateFormat = 'YYYY-MM-DD';
    const [fechaegreso, setFechaegreso] = useState(null);
    const[datosgastos,setDatosgastos]=useState(null)
    const[gastosproductos,setGastosproductos]=useState(null)
    const[gastosservicios,setGastosservicios]=useState(null)
    const[gasttosel,setGastosel]=useState(0)
    const[monto,setMonto]=useState(0)
    const[anotacion,setAnotacion]=useState('')

  const showModal = () => {
    setOpen(true);
    setOpenregistroegreso(false)
  };
  const handleOk = () => {
    setOpen(false);
    setOpenregistroegreso(false)
  };
  const handleCancel = () => {
    setOpen(false);
    setOpenregistroegreso(false)
  };
    
    const closemodal=()=>{
      setOpenregistroegreso(false)
      setOpenregistroegreso(false)
    }


    useEffect(() => {
    
        const cargardatos = async () => {
          const body = {};
          const endpoint='MisGastos/'
          const result = await Generarpeticion(endpoint, 'POST', body);
          
          const respuesta=result['resp']
          if (respuesta === 200) {
            // setDatosgastos(result['data'])
            const lista=result['data']
            const listaproductos = lista.filter((pro) => pro.categoria === 1);
            const listaservicios = lista.filter((ser) => ser.categoria === 2);
            setGastosproductos(listaproductos)
            setGastosservicios(listaservicios)
            
            
          } else {
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            // navigate('/');
          }
        };
    
        cargardatos();
      }, []);





    const tipocategoria=(event)=>{
        setDatosgastos(null)
        setGastosel(0)
        
        const valor=parseInt(event.target.value)
        if (valor===1){
          
          setDatosgastos(gastosproductos)
        }else if(valor===2){
          
          setDatosgastos(gastosservicios)
        }
        
      }
    const seleccionargasto=(value)=>{
          const valor= value;
          
          setGastosel(valor)
  
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
    const registrar_egreso = async () => {
        
          const datosregistrar = {
              gasto:gasttosel,
              monto:monto,
              fecha:fechaegreso,
              anotacion:anotacion,
              
  
          };
          const endpoint='RegistroEgreso/'
          const result = await Generarpeticion(endpoint, 'POST', datosregistrar);
          
          const respuesta=result['resp']
          if (respuesta === 200) {
            await new Promise(resolve => setTimeout(resolve, 2000))
            setDataresumen(result['data'])
            setCargarEgresos(!cargaregresos)
            setOpenregistroegreso(false)
            
          } else {
            
            
            // navigate('/');
          }
        };



    return(
        <div >

            <Modal
            
            open={open}
            title="AGREGAR REGISTRO EGRESO"
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
                  <Radio.Group onChange={tipocategoria}>
                    <Radio value="1"> Productos </Radio>
                    <Radio value="2"> Servicios </Radio>
                  </Radio.Group>
                </Form.Item>

                
                <Form.Item label="Gasto"name="Gasto"
                            rules={[
                                {
                                required: true,
                                message: 'Please input!',
                                },
                            ]}
                >
                    <Select name="listagasto"
                            value={gasttosel}
                            onChange={seleccionargasto}
                    >
                         <Select.Option value="">Seleccionar gasto</Select.Option>
                         {datosgastos &&  datosgastos.map((g) => (
                             <Select.Option key={g.id} value={g.id}>
                                 {g.nombre_gasto}
                             </Select.Option>
                         ))}
                    </Select>
                    
                </Form.Item>
                
                

                <Form.Item
                    label="Fecha Gasto"
                    name="DatePicker"
                    rules={[
                        {
                        required: true,
                        message: 'Please input!',
                        },
                    ]}
                    >
                    <DatePicker 
                        placeholder='Fecha Egreso'
                        dateFormat="yyyy-MM-dd"
                        onChange={seleccionfecha}
                        // onChange={onChange}
                        
                        >

                    </DatePicker>
                </Form.Item>
                
            
                

                <Form.Item
                    label="Monto Egreso"
                    name="MontoEgreso"
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
                   <Button type="primary" onClick={registrar_egreso}>Registrar</Button>
                </Form.Item>


            </Form>
            </Modal>
        </div>
    )

}

export default ModalRegistroEgreso