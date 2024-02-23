import React, {useEffect, useState} from 'react';

import {Button,Form,Input,InputNumber,Select,Radio,Modal,Typography,notification } from 'antd';
import {DatePicker } from 'antd';
import Generarpeticion from '../../../peticiones/apipeticiones';
import dayjs from 'dayjs';
import { WarningOutlined} from '@ant-design/icons';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Navigate, useNavigate } from "react-router-dom";
import Handelstorage from '../../../Storage/handelstorage';
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
 
  
const { Text } = Typography;

function ModalRegistroEgreso({openregistroegreso,setOpenregistroegreso,setDataegresos,
  setDataresumen,detalleseleccion,modoedicion}){
  
  const navigate=useNavigate()
  const [open, setOpen] = useState(openregistroegreso);
  
  
  const { MonthPicker, RangePicker } = DatePicker;
  dayjs.extend(customParseFormat);
  const dateFormat = 'YYYY-MM-DD';
  const [mesprincipal,setMesprincipal]=useState(0)
  const [annoprincipal,setAnnoprincipal]=useState(0)
  const [fechaegreso, setFechaegreso] = useState(null);
  const[datosgastos,setDatosgastos]=useState(null)
  const[gastosproductos,setGastosproductos]=useState(null)
  const[gastosservicios,setGastosservicios]=useState(null)
  const[gasttosel,setGastosel]=useState(0)
  const[monto,setMonto]=useState(0)
  const[anotacion,setAnotacion]=useState('')

  const [codigoegreso, setCodigoegreso]=useState(0)
  const [ready, setReady]=useState(false)
  const [valoresdefault,setValoresdefault]=useState([])
  const [modoactualizacion,setModoactualizacion]=useState(false)
  const [marcaradiobutton,serMarcaradiobutton]=useState('0')
  const [titulo,setTitulo]=useState('')
  

  const cargarvaloresdefault=(listproduc,listserv)=>{
    
    if(Object.keys(detalleseleccion).length>0){
      setCodigoegreso(detalleseleccion[0]['id'])
      setMonto(detalleseleccion[0]['monto_gasto'])
      setAnotacion(detalleseleccion[0]['anotacion'])
      setFechaegreso(detalleseleccion[0]['fecha_gasto'])
      setGastosel(detalleseleccion[0]['gasto'])
      setModoactualizacion(true)     
      setValoresdefault(detalleseleccion)

      if(detalleseleccion[0]['CategoriaGasto']==='Servicios'){
        serMarcaradiobutton('2')
        setDatosgastos(listserv)
      }else{
        serMarcaradiobutton('1')
        setDatosgastos(listproduc)
      }
      
      if(modoedicion===false){
        
        setTitulo('ACTUALIZAR EL EGRESO')
      }
      else{
        setTitulo('DETALLE DEL EGRESO')
      }


    }else{
      setCodigoegreso(0)
      setTitulo('AGREGAR UN NUEVO EGRESO')
    }

    
  }
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
          const datestorage=Handelstorage('obtenerdate');
          const mes_storage=datestorage['datames']
          const anno_storage=datestorage['dataanno']
          setMesprincipal(mes_storage)
          setAnnoprincipal(anno_storage)

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
            cargarvaloresdefault(listaproductos,listaservicios)
            setReady(true)
            
          } else if(respuesta === 403 || respuesta === 401){
            
            navigate('/')

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

  const formatearValor = (value) => {
    // Formatear el valor con separadores de miles
    return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
    };

  const parsearValor = (value) => {
      // Eliminar separadores de miles al convertir el valor
      return value ? parseInt(value.replace(/,/g, ''), 10) : undefined;
    };
  const seleccionaranotacion=(event)=>{
          const valor= event.target.value;
          
          setAnotacion(valor)
  
      }
  const seleccionfecha=(date, dateString)=> {
        
        setFechaegreso(dateString)
      }
  const registrar_egreso = async () => {
        
          const datosregistrar = {
              codgasto:codigoegreso,
              gasto:gasttosel,
              monto:monto,
              fecha:fechaegreso,
              anotacion:anotacion,
              
  
          };
          const endpoint='RegistroEgreso/'
          const result = await Generarpeticion(endpoint, 'POST', datosregistrar);
          
          const respuesta=result['resp']
          if (respuesta === 200) {
            const registros=result['data']

            
            
            const mes = registros['Egresos'][0].MesEgreso;
            const año = registros['Egresos'][0].AnnoEgreso;
            

            await new Promise(resolve => setTimeout(resolve, 2000))

            if(mes===mesprincipal && annoprincipal===año ){
              
              setDataresumen(registros['Resumen'])
              setDataegresos(registros['Egresos'])
            }
        

            setOpenregistroegreso(false)
            
          } else if(respuesta === 403 || respuesta === 401){
            
            navigate('/Closesesion')

          }else {
            
            mostrarmensajeerror('top',result['data']['error'])
          }
       };

  const mostrarmensajeerror = (placement,mensaje) => {
        api.open({
            message: 'ERROR',
            description: ` ${mensaje}`,
            placement,
            icon: (<WarningOutlined style={{color: 'red',}}/>
            ),
          });
        };
  const [api, contextHolder] = notification.useNotification();


  if(ready){
    return(
         <div >
 
             <Modal

                 open={open}
                 title={titulo}
                 onOk={handleOk}
                 onCancel={handleCancel}
                 footer={(_, { OkBtn, CancelBtn }) => (
                 <>
                    
                      {!modoedicion && (<Button onClick={closemodal}> Cancelar</Button>)}
                      {!modoedicion && ( <Button type="primary" onClick={registrar_egreso}>Registrar</Button>)}


                      {modoedicion && (<Button onClick={closemodal}> Cerrar</Button>)}
                      
                      
                     
                    
                 </>
                 )}
               >
             
                   <Form
                       {...formItemLayout}
                       variant="filled"
                       style={{
                       maxWidth: 600,
                       marginTop:'-35px'
                       }}
                   >   
 
                      <Form.Item>
                      {contextHolder}
                      </Form.Item>
                      <Form.Item label="Cod Egreso"name="CodEgreso">
                           
                           <InputNumber 
                              defaultValue={modoactualizacion ? valoresdefault[0]['id'] : 0} 
                              style={{width: '100%',}} disabled /> 
                      </Form.Item>
 
 
                      <Form.Item label="Categoria" >
                         <Radio.Group onChange={tipocategoria} defaultValue={marcaradiobutton}>
                           <Radio value="1" disabled={modoedicion}> Productos </Radio>
                           <Radio value="2" disabled={modoedicion}> Servicios </Radio>
                         </Radio.Group>
                      </Form.Item>
 
                       
                       <Form.Item label="Gasto"name="Gasto"
                                   rules={[
                                       {
                                       required: true,
                                       message: 'Favor seleccione!',
                                       },
                                   ]}
                       >
                           <Select 
                                name="listagasto" 
                                value={gasttosel}
                                disabled={modoedicion}
                                defaultValue={modoactualizacion ? valoresdefault[0]['NombreGasto'] : ''} 
                                onChange={seleccionargasto}>
                               <Select.Option  value="">Seleccionar gasto</Select.Option>
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
                               message: 'Favor seleccione la fecha!',
                               },
                           ]}
                           >
                           <DatePicker 
                                placeholder='Fecha Egreso' 
                                dateFormat="yyyy-MM-dd"
                                onChange={seleccionfecha}
                                disabled={modoedicion}
                                defaultValue={ modoactualizacion ?  dayjs(valoresdefault[0]['fecha_gasto'], dateFormat) : ''} 
                                format={dateFormat} 
                                
                                />
                       </Form.Item>
                       
                       <Form.Item
                           label="Monto Egreso"
                           name="MontoEgreso"
                           rules={[{required: true,message: 'Favor ingrese el monto!',},]}
                           >
                           <InputNumber 
                              onChange={seleccionarmonto}
                               style={{
                               width: '100%',
                               }}
                              defaultValue={modoactualizacion ? valoresdefault[0]['monto_gasto'] : 0}
                              disabled={modoedicion}
                              formatter={formatearValor}
                              parser={parsearValor}
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
                           <Input.TextArea 
                                defaultValue={modoactualizacion ? valoresdefault[0]['anotacion'] : ''} 
                                onChange={seleccionaranotacion}
                                disabled={modoedicion}
                                />
                       </Form.Item>



                      {modoactualizacion && (
                       <Form.Item
                           label="Fecha Registro"
                           name="FechaRegistro"
                           disabled 
                          
                           >
                           
                           <InputNumber defaultValue={valoresdefault[0]['fecha_registro'] }
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

export default ModalRegistroEgreso