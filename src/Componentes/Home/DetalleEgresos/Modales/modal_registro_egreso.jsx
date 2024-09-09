import React, {useEffect, useState} from 'react';
import {Button,Form,Input,InputNumber,Select,Modal,Typography,notification } from 'antd';
import {DatePicker } from 'antd';
import dayjs from 'dayjs';
import { WarningOutlined} from '@ant-design/icons';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Navigate, useNavigate } from "react-router-dom";
import Generarpeticion from '../../../../peticiones/apipeticiones';
import Handelstorage from '../../../../Storage/handelstorage';
import EditTable from './tabla_edit';

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
  setDataresumen,setDatasaldos,detalleseleccion,modoedicion}){
  
  const navigate=useNavigate()
  const [open, setOpen] = useState(openregistroegreso);
  
  
  const { MonthPicker, RangePicker } = DatePicker;
  dayjs.extend(customParseFormat);
  const dateFormat = 'YYYY-MM-DD';
  const [mesprincipal,setMesprincipal]=useState(0)
  const [annoprincipal,setAnnoprincipal]=useState(0)
  const [fechaegreso, setFechaegreso] = useState(null);
  const[datosgastos,setDatosgastos]=useState(null)
  
  const [categoriasel,setCategoriasel]=useState(0)
  const[gasttosel,setGastosel]=useState(0)
  const[monto,setMonto]=useState(0)
  const[anotacion,setAnotacion]=useState('')

  const [codigoegreso, setCodigoegreso]=useState(0)
  const [ready, setReady]=useState(false)
  const [valoresdefault,setValoresdefault]=useState([])
  const [modoactualizacion,setModoactualizacion]=useState(false)
  
  const [titulo,setTitulo]=useState('')

  const [listacategorias,setListacategorias]=useState([])
  const [listagastos,setListagastos]=useState([])

  const [detallemedios,setDetallemedios]=useState([])



 
 
  
  const cargarvaloresdefault=(lista_datos_gastos)=>{
    
    if(Object.keys(detalleseleccion).length>0){
      setCodigoegreso(detalleseleccion[0]['id'])
      setMonto(detalleseleccion[0]['monto_gasto'])
      setAnotacion(detalleseleccion[0]['anotacion'])
      setFechaegreso(detalleseleccion[0]['fecha_gasto'])
      setGastosel(detalleseleccion[0]['gasto'])
      setCategoriasel(detalleseleccion[0]['CodigoCategoriaGasto'])
      setModoactualizacion(true)     
      setValoresdefault(detalleseleccion)
      
      
      const valor=detalleseleccion[0]['CodigoCategoriaGasto']
      const lista_gastos_categoria = lista_datos_gastos.filter((pro) => pro.categoria === valor)
      setDatosgastos(lista_gastos_categoria)
      

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
          let mediosprincipal=[]
          let mediosutilizados=[]
          const body = {};
          const endpoint='MisDatosRegistroEgreso/'
          const result = await Generarpeticion(endpoint, 'POST', body);
          
          const respuesta=result['resp']
          if (respuesta === 200) {
            
            setListacategorias(result['data']['datoscategorias'])
            setListagastos(result['data']['datosgastos'])
            const lista_datos_gastos=result['data']['datosgastos']
            
            cargarvaloresdefault(lista_datos_gastos)
            
            mediosprincipal=result['data']['datosmedios']
            

            if(Object.keys(mediosprincipal).length>0){

              mediosprincipal.forEach((elemento) => {
                
                elemento.key = elemento.id;
                elemento.monto=0;
            })}
            
            // setDetallemedios(mediosprincipal)
            
            
          } else if(respuesta === 403 || respuesta === 401){
            
            navigate('/')

            }

            if(Object.keys(detalleseleccion).length>0){

              const idact=   detalleseleccion[0]['id']
              const enddata='MovileDatoEgreso/' + anno_storage +'/' + mes_storage + '/'+ idact + '/'
              const resultdata = await Generarpeticion(enddata, 'POST', body);
              const respuesta_data=resultdata['resp']
              if (respuesta_data === 200){
                mediosutilizados=resultdata['data']['Distribucion']
                

                mediosutilizados.forEach((utilizado) => {
                  const medio = mediosprincipal.find((principal) => principal.id === utilizado.mediopago_id);
                  
                  if (medio) {
                    // Si encuentra el elemento correspondiente, actualiza el campo monto
                    medio.monto = utilizado.monto;
                  }
                });

                


              
                
              }else if(respuesta === 403 || respuesta === 401){
                
                
              navigate('/')
              }

            }

        setDetallemedios(mediosprincipal)
        setReady(true)
        };
    
        cargardatos();
      }, []);


  const tipocategoria=(value)=>{
        setDatosgastos(null)
        setGastosel(0)
        
        const valor=parseInt(value)
        
      const lista_gastos_categoria = listagastos.filter((pro) => pro.categoria === valor)
      setDatosgastos(lista_gastos_categoria)
        
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
  
    return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
    };

  const parsearValor = (value) => {
      
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
         
          
          const filteredData = detallemedios.filter(item => item.monto > 0);
          const transformedData = filteredData.map(item => ({ mediopago: item.id, monto: parseFloat(item.monto) }));
          const jsonData = JSON.stringify(transformedData);
          
          
          const totalgasto = detallemedios.reduce((acc, item) => acc +  parseFloat(item.monto), 0);
          
          
          const datosregistrar = {
              codgasto:codigoegreso,
              gasto:gasttosel,
              monto:totalgasto,
              fecha:fechaegreso,
              anotacion:anotacion,
              distribucion:jsonData
              // codgasto:codigoregistro,
              // gasto:selectedOptiongasto,
              // monto:parseInt(monto,10),
              // fecha:fechaegreso,
              // anotacion:anotacion,
              // distribucion:jsonData
  
          };
          const endpoint='RegistroEgreso/'
          const result = await Generarpeticion(endpoint, 'POST', datosregistrar);
          
          const respuesta=result['resp']
          if (respuesta === 200) {
            const registros=result['data']['datos']
            
            
            
            const mes = registros['Egresos'][0].MesEgreso;
            const año = registros['Egresos'][0].AnnoEgreso;

            
            
            
            if(mes===mesprincipal && annoprincipal===año ){
              
              setDataresumen(registros['Resumen'])
              setDatasaldos(registros['Saldos'])
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
 
             <Modal width={700}

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
                      //  maxWidth: 1000,
                     
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

                      <Form.Item label="Categorias"name="Categorias"
                                   rules={[
                                       {
                                       required: true,
                                       message: 'Favor seleccione!',
                                       },
                                   ]}
                       >
                           <Select 
                                name="listacategoria" 
                                value={categoriasel}
                                disabled={modoedicion}
                                defaultValue={modoactualizacion ? valoresdefault[0]['CategoriaGasto'] : ''} 
                                onChange={tipocategoria}
                                >
                               <Select.Option  value="">Seleccionar categoria</Select.Option>
                               {listacategorias &&  listacategorias.map((g) => (
                                   <Select.Option key={g.nombre_categoria+g.id } value={g.id}>
                                       {g.nombre_categoria}
                                   </Select.Option>
                               ))}
                           </Select>
                           
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
                       

                          <EditTable detallemedios={detallemedios} setDetallemedios={setDetallemedios} monto={monto} ></EditTable>
                       


                       {/* <Form.Item
                           label="Total Egreso"
                           name="MontoEgreso"
                          //  rules={[{required: true,message: 'Favor ingrese el monto!',},]}
                           >
                           <InputNumber 
                              onChange={seleccionarmonto}
                               style={{
                               width: '100%',
                               }}
                              //defaultValue={modoactualizacion ? valoresdefault[0]['monto_gasto'] : monto}
                              disabled
                              formatter={formatearValor}
                              parser={parsearValor}
                              defaultValue={monto}
                           />
                       </Form.Item>  */}
 
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