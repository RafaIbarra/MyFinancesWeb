import React, {useEffect, useState} from 'react';
import { Button, Table, Typography,notification } from 'antd';
import { DeleteOutlined,RetweetOutlined,PlusCircleTwoTone,CheckOutlined,WarningOutlined} from '@ant-design/icons';
import ModalEliminarIngreso from './modal_eliminar_ingreso';
import ModalRegistroIngreso from './modal_registro_ingreso';

import './detalleingreso.css'
import FormItem from 'antd/es/form/FormItem';
const { Text } = Typography;

function DetalleIngreso({dataingresos,setDataingresos,setDataresumen}){

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

    
  const [openeliminaringreso, setOpeneliminaringreso] = useState(false);
  const [openregistroingreso, setOpenregistroingreso] = useState(false);

  const [detalle,setDetalle]=useState(null)
  const [detalleseleccioningreso,setDetalleseleccioningreso]=useState([])
 
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [montototalingreso,setMontototalingreso]=useState(0)
  const [canttotalingreso,setCanttotalingreso]=useState(0)

  const [erroreliminarcion, setErroreliminacion]=useState(false)
  const [errorcantidadunica, setErrorcantidadunica]=useState(true)
  const [mesajecantidadunica, setMesajecantidadunica]=useState('')
  const [modoedicioningreso,setModoedicioningreso]=useState(false)

  const nuevo=()=>{
    setDetalleseleccioningreso([])
    setOpenregistroingreso(true)
    setModoedicioningreso(false)
    }


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
  const eliminar=()=>{
    
    setOpeneliminaringreso(true)
    
    } 

  const detalleregistro=()=>{
        
      const ultimoElemento = selectedRowKeys[selectedRowKeys.length - 1];
      
      const detallesel=detalle.filter((item) => item.id ===ultimoElemento)
      setDetalleseleccioningreso(detallesel)
      setOpenregistroingreso(true)
      setModoedicioningreso(true)

      // const registrosdetalle=registros.filter((item) => item.Codigo !== 3)

    }
  const actualizar=()=>{
        
      const ultimoElemento = selectedRowKeys[selectedRowKeys.length - 1];
      
      const detallesel=detalle.filter((item) => item.id ===ultimoElemento)
      setDetalleseleccioningreso(detallesel)
      setOpenregistroingreso(true)
      setModoedicioningreso(false)

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

  const columns=[
      { title: 'Descripcion',dataIndex: 'NombreIngreso',key: 'Descripcion_i'},
      { title: 'Tipo',dataIndex: 'TipoIngreso',key: 'Tipo_i'},
      { title: 'Ingreso',
        dataIndex: 'monto_ingreso',
        key: 'Ingreso_i',
        render: (monto_ingreso) => (
          <span>
            Gs. {Number(monto_ingreso).toLocaleString('es-ES')}
          </span>
        ),
      },
      { title: 'Fecha Ingreso',dataIndex: 'fecha_ingreso',key: 'FechaGasto_i'},
      { title: 'Fecha Registro',dataIndex: 'fecha_registro',key: 'FechaRegistro_i'},
      { title: 'Anotacion',dataIndex: 'anotacion',key: 'Anotacion_i'},
    ]
   
    
  useEffect(() => {
        setSelectedRowKeys([])
        const cargardatos =   () => {

                
  
          setErroreliminacion(true)
          setErrorcantidadunica(true)
          setMesajecantidadunica('seleccione el registro')
          setModoedicioningreso(false)
          const registros=dataingresos
          
          if(Object.keys(registros).length>0){
            registros.forEach((elemento) => {
              
              elemento.key = elemento.id;
            })
            let totalingreso=0
            let cantingreso=0
            registros.forEach(({ monto_ingreso }) => {totalingreso += monto_ingreso,cantingreso+=1})
            setMontototalingreso(totalingreso)
            setCanttotalingreso(cantingreso)
            
            setDetalle(registros)
            
          }
          else{
            setDetalle([])
            setMontototalingreso(0)
            setCanttotalingreso(0)
            
          }
          
          
          
        };
    
        cargardatos();
      }, [dataingresos]);
    


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
  const handleOk = () => {
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
    };
    return(
        <div>
            {contextHolder}
            <Table 
              rowSelection={rowSelection} 
              scroll={{y: 400,}}
              size="small"
              columns={columns} 
              dataSource={detalle} 
              pagination={false}
              bordered
            />

            <div className='contenedor-resumen'>
                <FormItem >
                  <Text strong>CANTIDAD REGISTROS: </Text>
                  <Text strong>   {Number(canttotalingreso).toLocaleString('es-ES')}</Text>
                    
                </FormItem>

                <FormItem >
                    <Text strong>TOTAL INGRESOS: </Text>
                    <Text strong>GS. {Number(montototalingreso).toLocaleString('es-ES')}</Text>
                    
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

                <Button type="primary" icon={<PlusCircleTwoTone/>} onClick={nuevo} >Agregar</Button>

                
                {openeliminaringreso &&( <ModalEliminarIngreso 
                                        openeliminaringreso={openeliminaringreso}
                                        setOpeneliminaringreso={setOpeneliminaringreso}
                                        setDataingresos={setDataingresos}
                                        selectedRowKeys={selectedRowKeys}
                                        setDataresumen={setDataresumen} 
                                      ></ModalEliminarIngreso>)}

                {openregistroingreso &&( <ModalRegistroIngreso 
                                          openregistroingreso={openregistroingreso} 
                                          setOpenregistroingreso={setOpenregistroingreso} 
                                          setDataingresos={setDataingresos}
                                          setDataresumen={setDataresumen}
                                          detalleseleccioningreso={detalleseleccioningreso}
                                          modoedicioningreso={modoedicioningreso}
                                          ></ModalRegistroIngreso>)}
                
            </div>

        </div>
    )


}
export default DetalleIngreso