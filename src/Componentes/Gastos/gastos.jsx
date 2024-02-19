import React, {useEffect, useState} from 'react';
import { Button, Table, Typography,notification } from 'antd';
import { DeleteOutlined,RetweetOutlined,PlusCircleTwoTone,CheckOutlined,WarningOutlined} from '@ant-design/icons';
import ModalRegistroGasto from './modal_registro_gastos';
import Generarpeticion from '../../peticiones/apipeticiones';
import './gastos.css'
import FormItem from 'antd/es/form/FormItem';

const { Text } = Typography;

function Gastos(){
    const [api, contextHolder] = notification.useNotification();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [gastos,setGastos]=useState([])
    const [totalgastos,setTotalgastos]=useState(0)
    const [cantidadgastos,setCantidadgastos]=useState(0)
    

    const [detalleselecciongasto,setDetalleselecciongasto]=useState([])

    const [openeliminargasto, setOpeneliminargasto] = useState(false);
    const [openregistrogasto, setOpenregistrogasto] = useState(false);

    const [erroreliminarcion, setErroreliminacion]=useState(false)
    const [errorcantidadunica, setErrorcantidadunica]=useState(true)
    const [mesajecantidadunica, setMesajecantidadunica]=useState('')
    const [modoediciongasto,setModoediciongasto]=useState(false)

    const [cargarcomponentesgasto,setCargarcomponentesgasto]=useState(false)

    const columns=[
        { title: 'Codigo',dataIndex: 'id',key: 'id_gast',width:'100px'},
        { title: 'Nombre Gasto',dataIndex: 'nombre_gasto',key: 'nombre_gasto'},
        { title: 'Tipo',dataIndex: 'DescripcionTipoGasto',key: 'DescripcionTipoGasto'},
        { title: 'Categoria',dataIndex: 'DescripcionCategoriaGasto',key: 'DescripcionCategoriaGasto'},
        { title: 'Monto Total Registrado',
          dataIndex: 'TotalEgresos',
          key: 'TotalEgresos',
          render: (TotalEgresos) => (
            <span>
              Gs. {Number(TotalEgresos).toLocaleString('es-ES')}
            </span>
          ),
        },
        { title: 'Cantidad Registros',dataIndex: 'CantidadRegistros',key: 'CantidadRegistros'},
        { title: 'Fecha Registro',dataIndex: 'fecha_registro',key: 'FechaRegistro_i'},
        
      ]


    const nuevo=()=>{
        setDetalleselecciongasto([])
        setOpenregistrogasto(true)
        setModoediciongasto(false)
      }

    const eliminar=()=>{
    
        setOpeneliminargasto(true)
        
      }

    const detalleregistro=()=>{
        
        const ultimoElemento = selectedRowKeys[selectedRowKeys.length - 1];
        
        const detallesel=gastos.filter((item) => item.id ===ultimoElemento)
        setDetalleselecciongasto(detallesel)
        setOpenregistrogasto(true)
        setModoediciongasto(true)
  
        // const registrosdetalle=registros.filter((item) => item.Codigo !== 3)
  
      }
    const actualizar=()=>{
          
        const ultimoElemento = selectedRowKeys[selectedRowKeys.length - 1];
        
        const detallesel=gastos.filter((item) => item.id ===ultimoElemento)
        setDetalleselecciongasto(detallesel)
        setOpenregistrogasto(true)
        setModoediciongasto(false)
  
        // const registrosdetalle=registros.filter((item) => item.Codigo !== 3)
  
      }

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

    const mensajeControlEliminacion = (placement) => {
        api.open({
            message: 'ERROR',
            
            description:
              'Debe seleccionar uno o mas registros de ingresos para eliminar!!.',
              placement,
            icon: (<WarningOutlined style={{color: 'red',}}/>
            ),
          });
        };

    useEffect(() => {
        
        const cargardatos = async () => {
        
            const body = {};
            const endpoint='MisGastos/'
            const result = await Generarpeticion(endpoint, 'POST', body);
            
            const respuesta=result['resp']
            
            if (respuesta === 200) {
                const registros=result['data']
                
                if(Object.keys(registros).length>0){
                    registros.forEach((elemento) => {
                        
                        elemento.key = elemento.id;
                    })
                    let totalprod=0
                    let cantprod=0
                    registros.forEach(({ TotalEgresos }) => {totalprod += TotalEgresos,cantprod+=1})
                    setTotalgastos(totalprod)
                    setCantidadgastos(cantprod)
                    
                    setGastos(registros)
                    
                    
                    }
                    else{
                    
                    setDetalle([])
                    
                    }
                
                
            }
            setErroreliminacion(true)
            setErrorcantidadunica(true)
            setMesajecantidadunica('seleccione el registro')
            setModoediciongasto(false)
            setCargarcomponentesgasto(true)
            
            };
              
        
            cargardatos();
        }, [cargarcomponentesgasto]);
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
            
        }

    const rowSelection = { selectedRowKeys, onChange: onSelectChange,};

    if (cargarcomponentesgasto){

        return(
            <div>
                  {contextHolder}
                  <h4 className='tituloform' > Datos Gastos </h4>
                  <Table 
                    rowSelection={rowSelection} 
                    scroll={{x: 300,y: 400,}}
                    size="small"
                    columns={columns} 
                    dataSource={gastos} 
                    pagination={false}
                    bordered
                  />
                  <div className='contenedor-resumen'>
                      <FormItem >
                        <Text strong>CANTIDAD GASTOS: </Text>
                        <Text strong>   {Number(cantidadgastos).toLocaleString('es-ES')}</Text>
                          
                      </FormItem>
    
                      <FormItem >
                          <Text strong>TOTAL EGRESOS: </Text>
                          <Text strong>GS. {Number(totalgastos).toLocaleString('es-ES')}</Text>
                          
                      </FormItem>
    
                  </div>
    
                  <div className='contenedor-flex'>
    
                          <Button type="primary" 
                                  icon={<CheckOutlined /> } 
                                  onClick={ errorcantidadunica ? () => mensajeregistrounico('top','vista detalle') : detalleregistro}
                                  > Detalle
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
    
                          <Button type="primary" 
                                  icon={<PlusCircleTwoTone/>} 
                                  onClick={nuevo} 
                                  >Agregar
                          </Button>
                          {/* {openeliminarproducto &&( <ModalEliminarProducto 
                                        openeliminarproducto={openeliminarproducto}
                                        setOpeneliminarproducto={setOpeneliminarproducto}
                                        selectedRowKeys={selectedRowKeys}
                                        cargarcomponentesproductos={cargarcomponentesproductos}
                                        setCargarcomponentesproductos={setCargarcomponentesproductos} 
                                      ></ModalEliminarProducto>)} */}

    
                          {openregistrogasto &&( <ModalRegistroGasto 
                                              openregistrogasto={openregistrogasto} 
                                              setOpenregistrogasto={setOpenregistrogasto} 
                                              detalleselecciongasto={detalleselecciongasto}
                                              modoediciongasto={modoediciongasto}
                                              cargarcomponentesgasto={cargarcomponentesgasto}
                                              setCargarcomponentesgasto={setCargarcomponentesgasto}
                                              ></ModalRegistroGasto>
                                              )}
    
    
                        
    
                  </div>
            </div>
        )
    }

}

export default Gastos