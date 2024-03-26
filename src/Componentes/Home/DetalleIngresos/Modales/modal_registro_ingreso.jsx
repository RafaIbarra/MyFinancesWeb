import React, {useEffect, useState} from 'react';
import {Button,Form,Input,InputNumber,Select,Radio,Modal,Typography,notification } from 'antd';
import {DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Navigate, useNavigate } from "react-router-dom";
import Generarpeticion from '../../../../peticiones/apipeticiones'
import Handelstorage from '../../../../Storage/handelstorage'


import { WarningOutlined} from '@ant-design/icons';
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

function ModalRegistroIngreso({
  openregistroingreso,setOpenregistroingreso,setDataingresos,setDataresumen,
  detalleseleccioningreso,modoedicioningreso,setDatasaldos

}){

    const navigate=useNavigate()
    const [open, setOpen] = useState(openregistroingreso);
    const { MonthPicker, RangePicker } = DatePicker;
    dayjs.extend(customParseFormat);
    const dateFormat = 'YYYY-MM-DD';
    const [mesprincipal,setMesprincipal]=useState(0)
    const [annoprincipal,setAnnoprincipal]=useState(0)
    const [fechaingreso, setFechaingreso] = useState(null);
    const[datosproductos,setDatosproductos]=useState(null)
    const[productosfijos,setProductosfijos]=useState(null)
    const[productosocacionales,setProductosocacionales]=useState(null)
    const[productosel,setProductosel]=useState(0)
    const[monto,setMonto]=useState(0)
    const[anotacion,setAnotacion]=useState('')

    const [codigoingreso, setCodigoingreso]=useState(0)
    const [ready, setReady]=useState(false)
    const [valoresdefaultingreso,setValoresdefaultingreso]=useState([])
    const [modoactualizacioningreso,setModoactualizacioningreso]=useState(false)
    const [marcaradiobuttoningreso,serMarcaradiobuttoningreso]=useState('0')
    const [tituloingreso,setTituloingreso]=useState('')

    


    const cargarvaloresdefault=(fijo_list,ocacionales_list)=>{
    
      if(Object.keys(detalleseleccioningreso).length>0){

        setCodigoingreso(detalleseleccioningreso[0]['id'])
        setMonto(detalleseleccioningreso[0]['monto_ingreso'])
        setAnotacion(detalleseleccioningreso[0]['anotacion'])
        setFechaingreso(detalleseleccioningreso[0]['fecha_ingreso'])
        setProductosel(detalleseleccioningreso[0]['producto_financiero'])
        
        setModoactualizacioningreso(true)     
        setValoresdefaultingreso(detalleseleccioningreso)
  
        if(detalleseleccioningreso[0]['TipoIngreso']==='Fijo'){
          serMarcaradiobuttoningreso('1')
          setDatosproductos(fijo_list)
          
        }else{
          serMarcaradiobuttoningreso('2')
          setDatosproductos(ocacionales_list)
          
        }
        
        if(modoedicioningreso===false){
          
          setTituloingreso('ACTUALIZAR EL INGRESO')
        }
        else{
          setTituloingreso('DETALLE DEL INGRESO')
        }
  
  
      }else{
        setCodigoingreso(0)
        setTituloingreso('AGREGAR UN NUEVO INGRESO')
      }
  
      
    }


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
          const datestorage=Handelstorage('obtenerdate');
          const mes_storage=datestorage['datames']
          const anno_storage=datestorage['dataanno']
          setMesprincipal(mes_storage)
          setAnnoprincipal(anno_storage)
          const body = {};
          const endpoint='MisProductosFinancieros/'
          const result = await Generarpeticion(endpoint, 'POST', body);
          
          const respuesta=result['resp']
          if (respuesta === 200) {
     
            const lista=result['data']
            
            const listafijos = lista.filter((fij) => fij.tipoproducto === 1);
            const listasocacionales = lista.filter((oca) => oca.tipoproducto === 2);
            setProductosfijos(listafijos)
            setProductosocacionales(listasocacionales)
            cargarvaloresdefault(listafijos,listasocacionales)
            setReady(true)
            
            
          }else if(respuesta === 403 || respuesta === 401){
            
            navigate('/')

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
        
        setFechaingreso(dateString)
      }
    const registrar_ingreso = async () => {
        
          const datosregistrar = {
              codingreso:codigoingreso,
              producto:productosel,
              monto:monto,
              fecha:fechaingreso,
              anotacion:anotacion,
              
  
          };
          const endpoint='RegistroIngreso/'
          const result = await Generarpeticion(endpoint, 'POST', datosregistrar);
          
          const respuesta=result['resp']
          if (respuesta === 200) {
            

            const registros=result['data']['datos']
            const mes = registros['Ingresos'][0].MesIngreso;
            const año = registros['Ingresos'][0].AnnoIngreso;
            
            if(mes===mesprincipal && annoprincipal===año ){
              setDataingresos(registros['Ingresos'])
              setDataresumen(registros['Resumen'])
              setDatasaldos(registros['Saldos'])
              
            }

            
            
            setOpenregistroingreso(false)
            
          } else if(respuesta === 403 || respuesta === 401){navigate('/Closesesion')
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
    const formatearValor = (value) => {
    
      return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
      };

    const parsearValor = (value) => {
       
        return value ? parseInt(value.replace(/,/g, ''), 10) : undefined;
      };

    if(ready){
      return(
          <div >
             
              <Modal
              
              open={open}
              title={tituloingreso}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={(_, { OkBtn, CancelBtn }) => (
              <>
                  {!modoedicioningreso && (<Button onClick={closemodal}> Cancelar</Button>)}
                  {!modoedicioningreso && ( <Button type="primary" onClick={registrar_ingreso}>Registrar</Button>)}
                  {modoedicioningreso && (<Button onClick={closemodal}> Cerrar</Button>)}
              </>
              )}
          >
              
              <Form
                  {...formItemLayout}
                  variant="filled"
                  style={{
                  maxWidth: 600,
                  marginTop:'-30px'
                  }}
              >   
                  <Form.Item>

                   {contextHolder}
                  </Form.Item>
                  <Form.Item label="Cod Ingreso"name="CodIngreso">
                           
                           <InputNumber 
                              defaultValue={modoactualizacioningreso ? valoresdefaultingreso[0]['id'] : 0} 
                              style={{width: '100%',}} disabled /> 
                  </Form.Item>

                  <Form.Item label="Categoria">
                    <Radio.Group onChange={tipoproducto} defaultValue={marcaradiobuttoningreso}>
                      <Radio value="1" disabled={modoedicioningreso}> Fijo </Radio>
                      <Radio value="2" disabled={modoedicioningreso} > Ocacionales </Radio>
                    </Radio.Group>
                  </Form.Item>

                  
                  <Form.Item label="Ingreso"name="Ingreso"
                              rules={[
                                  {
                                  required: true,
                                  message: 'Favor Seleccione!',
                                  },
                              ]}
                  >
                      <Select name="listaproductos"
                              value={productosel}
                              disabled={modoedicioningreso}
                              defaultValue={modoactualizacioningreso ? valoresdefaultingreso[0]['NombreIngreso'] : ''} 
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
                          message: 'Favor Seleccione la fecha!',
                          },
                      ]}
                      >
                      <DatePicker 
                          placeholder='Fecha Ingreso'
                          dateFormat="yyyy-MM-dd"
                          onChange={seleccionfecha}
                          disabled={modoedicioningreso}
                          defaultValue={ modoactualizacioningreso ?  dayjs(valoresdefaultingreso[0]['fecha_ingreso'], dateFormat) : ''} 
                          format={dateFormat} 
                          
                          >

                      </DatePicker>
                  </Form.Item>
                  
              
                  

                  <Form.Item
                      label="Monto Ingreso"
                      name="MontoIngreso"
                      rules={[
                          {
                          required: true,
                          message: 'Favor ingrese el monto!',
                          },
                      ]}
                      >
                      <InputNumber
                          onChange={seleccionarmonto}
                          style={{width: '100%',}}
                          defaultValue={modoactualizacioningreso ? valoresdefaultingreso[0]['monto_ingreso'] : 0}
                          disabled={modoedicioningreso}
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
                            onChange={seleccionaranotacion}
                            defaultValue={modoactualizacioningreso ? valoresdefaultingreso[0]['anotacion'] : ''}
                            disabled={modoedicioningreso}
                            
                      />
                  </Form.Item>

                  {modoactualizacioningreso && (
                       <Form.Item
                           label="Fecha Registro"
                           name="FechaRegistro"
                           disabled 
                          
                           >
                           
                           <InputNumber defaultValue={valoresdefaultingreso[0]['fecha_registro'] }
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

export default ModalRegistroIngreso