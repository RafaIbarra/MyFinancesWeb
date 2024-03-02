import React, {useEffect, useState} from 'react';
import { Button, Table,Typography,notification,Space    } from 'antd';
import { DeleteOutlined,    RetweetOutlined  ,PlusCircleTwoTone,WarningOutlined,InfoOutlined,CheckOutlined } from '@ant-design/icons';
import FormItem from 'antd/es/form/FormItem';
import './detalleegreso.css'

import ModalEliminarEgreso from './Modales/modal_eliminar_egreso'
import ModalRegistroEgreso from './Modales/modal_registro_egreso';
import GraficoEgresoso from './Grafico/graficoegresos';


const { Text } = Typography;
function DetalleEgreso({dataegresos,setDataegresos,setDataresumen,
                        setImgresumen,setImgegresos,imgegresos}){
   
    
    const [detalle,setDetalle]=useState(null)
    const [detalleseleccion,setDetalleseleccion]=useState([])

    const [openeliminaregreso, setOpeneliminaregreso] = useState(false);
    const [openregistroegreso, setOpenregistroegreso] = useState(false);
    
    const [loading, setLoading] = useState(false);
    // const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [montototalegreso,setMontototalegreso]=useState(0)
    const [canttotalegreso,setcanttotalegreso]=useState(0)

    const [erroreliminarcion, setErroreliminacion]=useState(false)
    const [errorcantidadunica, setErrorcantidadunica]=useState(true)
    const [mesajecantidadunica, setMesajecantidadunica]=useState('')
    const [modoedicion,setModoedicion]=useState(false)
    
    
    const columns=[
      
      { title: 'Descripcion',
        dataIndex: 'NombreGasto',
        key: 'DetalleEgreso_Descripcion',
        sorter: (a, b) => a.NombreGasto.localeCompare(b.NombreGasto),
      },
      { title: 'Tipo',
        dataIndex: 'TipoGasto',
        key: 'DetalleEgreso_Tipo',
        filters: [
          {
            text: 'Ocasionales',
            value: 'Ocasionales',
          },
          {
            text: 'Fijo',
            value: 'Fijo',
          },
          
        ],
        onFilter: (value, record) => record.TipoGasto.indexOf(value) === 0,
      },

      { title: 'Categoria',
        dataIndex: 'CategoriaGasto', 
        key: 'DetalleEgreso_Categoria',
        filters: [
          {
            text: 'Productos',
            value: 'Productos',
          },
          {
            text: 'Servicios',
            value: 'Servicios',
          },
          
        ],

        onFilter: (value, record) => record.CategoriaGasto.indexOf(value) === 0,
        sorter: (a, b) => a.CategoriaGasto.localeCompare(b.CategoriaGasto),

      },

      { title: 'Egreso',
        dataIndex: 'monto_gasto',
        key: 'DetalleEgreso_Egreso',
        render: (monto_gasto) => (
          <span>
            Gs. {Number(monto_gasto).toLocaleString('es-ES')}
          </span>
        ),
      },
      { title: 'Fecha Gasto',dataIndex: 'fecha_gasto',key: 'DetalleEgreso_FechaGasto'},
      { title: 'Fecha Registro',
        dataIndex: 'fecha_registro',
        key: 'DetalleEgreso_FechaRegistro',
        width: 250,
        sorter: (a, b) => new Date(a.fecha_registro) - new Date(b.fecha_registro),
      },
      
    ]
    

    
    useEffect(() => {
       
        const cargardatos =  () => {
            setSelectedRowKeys([])
            
            setErroreliminacion(true)
            setErrorcantidadunica(true)
            setMesajecantidadunica('seleccione el registro')
            setModoedicion(false)
            const registros=dataegresos

            if(Object.keys(registros).length>0){

              registros.forEach((elemento) => {
                
                elemento.key = elemento.id;
              })
              let totalgasto=0
              let cantgasto=0
              registros.forEach(({ monto_gasto }) => {totalgasto += monto_gasto,cantgasto+=1})
              setMontototalegreso(totalgasto)
              setcanttotalegreso(cantgasto)
              setDetalle(registros)

            }else{
              setDetalle([])
              setMontototalegreso(0)
              setcanttotalegreso(0)
              
            }
            setSelectedRowKeys([])
          

          
        };
    
        cargardatos();
      }, [dataegresos]);



    const start = () => {
        setLoading(true);
        
        setTimeout(() => {setSelectedRowKeys([]);setLoading(false);}, 1000);
      };

    const onSelectChange = (newSelectedRowKeys) => {
        
        if(newSelectedRowKeys.length>0){
          setErroreliminacion(false)
        }else{
          setErroreliminacion(true)
        }

        if(newSelectedRowKeys.length ===1){
          
          setErrorcantidadunica(false)
        }else{
          
            setErrorcantidadunica(true)
            if(newSelectedRowKeys.length > 1){
              setMesajecantidadunica('solo debe seleccionar un registro.')
            }
            else{
              setMesajecantidadunica('seleccionar el registro')
            }
         }

        setSelectedRowKeys(newSelectedRowKeys);
        
      };

    const rowSelection = { selectedRowKeys, onChange: onSelectChange,};
    
    const [api, contextHolder] = notification.useNotification();

    const mensajeControlEliminacion = (placement) => {
      api.open({
          message: 'ERROR',
          
          description:
            'Debe seleccionar uno o mas registros de egresos para eliminar!!.',
            placement,
          icon: (<WarningOutlined style={{color: 'red',}}/>
          ),
        });
    };
      

    const mensajeregistrounico = (placement,accion) => {
      
      api.open({
          message: 'ERROR',
          
          description:
          `Para la ${accion}  ${mesajecantidadunica}`,
          placement,
          icon: (<WarningOutlined style={{color: 'red',}}/>
          ),
        });
      };

    const eliminar=()=>{
        setOpeneliminaregreso(true)
      }

    const actualizar=()=>{
        
        const ultimoElemento = selectedRowKeys[selectedRowKeys.length - 1];
        
        const detallesel=detalle.filter((item) => item.id ===ultimoElemento)
        
        setDetalleseleccion(detallesel)
        setOpenregistroegreso(true)
        setModoedicion(false)

        // const registrosdetalle=registros.filter((item) => item.Codigo !== 3)

      }

    const detalleregistro=()=>{
        
        const ultimoElemento = selectedRowKeys[selectedRowKeys.length - 1];
        
        const detallesel=detalle.filter((item) => item.id ===ultimoElemento)
        console.log(detallesel)
        setDetalleseleccion(detallesel)
        setOpenregistroegreso(true)
        setModoedicion(true)

        // const registrosdetalle=registros.filter((item) => item.Codigo !== 3)

      }

    const nuevo=()=>{
      setDetalleseleccion([])
      setOpenregistroegreso(true)
      setModoedicion(false)
      }

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
        }, 2000);
      };

    
    
    const handleCancel = () => {
        
        setOpen(false);
      };
      
    return(
        <div className='contenedor-tab-egresos'>
            {contextHolder}
            <div className='contenedor-tabla-egresos'>

              <Table rowSelection={rowSelection} 
                  scroll={{y: 400,}}
                  style={{height:'450px'}}
                  columns={columns} 
                  size="small"
                  dataSource={detalle} 
                  pagination={false}
                  bordered 
              />
          
              <div className='contenedor-resumen'>
                  <FormItem >
                    <Text strong>CANTIDAD REGISTROS: </Text>
                    <Text strong>   {Number(canttotalegreso).toLocaleString('es-ES')}</Text>
                      
                  </FormItem>

                  <FormItem >
                      <Text strong>TOTAL EGRESOS: </Text>
                      <Text strong>GS. {Number(montototalegreso).toLocaleString('es-ES')}</Text>
                      
                  </FormItem>

              </div>
              <div className='contenedor-flex-botonera'>
                <Button type="primary" 
                          icon={<CheckOutlined /> } 
                          onClick={ errorcantidadunica ? () => mensajeregistrounico('top','vista detalle') : detalleregistro}
                          > 
                          
                        Detalle
                  </Button>

                  <Button type="primary" 
                      icon={<DeleteOutlined/>} 
                      danger 
                      onClick={ erroreliminarcion ? () => mensajeControlEliminacion('top') : eliminar}
                      > 
                      Eliminar 
                  </Button>
                      
                  <Button type="primary" 
                          icon={<RetweetOutlined/> } 
                          onClick={ errorcantidadunica ? () => mensajeregistrounico('top','actualizacion') : actualizar}
                          > 
                          
                          Actualizar
                  </Button>

                  <Button type="primary" icon={<PlusCircleTwoTone/>} onClick={nuevo} >Agregar</Button>
                  
                  
                  {openeliminaregreso &&( <ModalEliminarEgreso openeliminaregreso={openeliminaregreso} 
                                                      setOpeneliminaregreso={setOpeneliminaregreso} 
                                                      setDataegresos={setDataegresos} 
                                                      setDataresumen={setDataresumen} 
                                                      selectedRowKeys={selectedRowKeys}
                                                      setImgresumen={setImgresumen}
                                                      setImgegresos={setImgegresos}
                                        ></ModalEliminarEgreso>)}

                  {openregistroegreso &&( <ModalRegistroEgreso openregistroegreso={openregistroegreso} 
                                              setOpenregistroegreso={setOpenregistroegreso} 
                                              setDataegresos={setDataegresos} 
                                              setDataresumen={setDataresumen}
                                              detalleseleccion={detalleseleccion}
                                              modoedicion={modoedicion}
                                              setImgresumen={setImgresumen}
                                              setImgegresos={setImgegresos}
                                            ></ModalRegistroEgreso>)}
                  
              </div>
            </div>
           
            <GraficoEgresoso dataegresos={dataegresos} imgegresos={imgegresos}></GraficoEgresoso>
        </div>
    )


}
export default DetalleEgreso