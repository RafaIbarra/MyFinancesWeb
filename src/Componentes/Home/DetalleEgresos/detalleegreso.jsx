import React, {useEffect, useState} from 'react';
import { Button, Table,Typography,notification,Space    } from 'antd';
import { DeleteOutlined,    RetweetOutlined  ,PlusCircleTwoTone,WarningOutlined,InfoOutlined,CheckOutlined } from '@ant-design/icons';
import ModalEliminarEgreso from './modal_eliminar_egreso';
import ModalRegistroEgreso from './modal_registro_egreso';
import './detalleegreso.css'
import FormItem from 'antd/es/form/FormItem';


const { Text } = Typography;
function DetalleEgreso({dataegresos,setDataegresos,setDataresumen}){
   
    
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
      
      { title: 'Descripcion',dataIndex: 'NombreGasto',key: 'DetalleEgreso_Descripcion'},
      { title: 'Tipo',dataIndex: 'TipoGasto',key: 'DetalleEgreso_Tipo'},
      { title: 'Categoria',dataIndex: 'CategoriaGasto', key: 'DetalleEgreso_Categoria'},
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
      { title: 'Fecha Registro',dataIndex: 'fecha_registro',key: 'DetalleEgreso_FechaRegistro',width: 250,},
      
    ]
    

    
    useEffect(() => {
       
        const cargardatos =  () => {
            setSelectedRowKeys([])
            // if(selectedRowKeys.length > 0){
            //   setErroreliminacion(false)
            // }else{
            //   setErroreliminacion(true)
            // }

            
            // if(selectedRowKeys.length ===1){
          
            //   setErrorcantidadunica(false)
            // }else{
              
            //     setErrorcantidadunica(true)
            //     if(selectedRowKeys.length > 1){
            //       setMesajecantidadunica('solo debe seleccionar un registro.')
            //     }
            //     else{
            //       setMesajecantidadunica('seleccione el registro')
            //     }
            //  }
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
        <div>
            {contextHolder}
            
              <Table 
                rowSelection={rowSelection} 
                scroll={{y: 400,}}
                columns={columns} 
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
            <div className='contenedor-flex'>
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
                                      ></ModalEliminarEgreso>)}

                {openregistroegreso &&( <ModalRegistroEgreso openregistroegreso={openregistroegreso} 
                                            setOpenregistroegreso={setOpenregistroegreso} 
                                            setDataegresos={setDataegresos} 
                                            setDataresumen={setDataresumen}
                                            detalleseleccion={detalleseleccion}
                                            modoedicion={modoedicion}
                                          ></ModalRegistroEgreso>)}
                
            </div>
           

        </div>
    )


}
export default DetalleEgreso