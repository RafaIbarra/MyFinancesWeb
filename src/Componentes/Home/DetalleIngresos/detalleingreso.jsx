import React, {useEffect, useState} from 'react';
import { Button, Table, Typography } from 'antd';
import { DeleteOutlined,RetweetOutlined,PlusCircleTwoTone} from '@ant-design/icons';
import ModalEliminarIngreso from './modal_eliminar_ingreso';
import ModalRegistroIngreso from './modal_registro_ingreso';

import './detalleingreso.css'
const { Text } = Typography;
function DetalleIngreso({dataingresos,setDataingresos,setDataresumen}){
    
  const [openeliminaringreso, setOpeneliminaringreso] = useState(false);
  const [openregistroingreso, setOpenregistroingreso] = useState(false);

  const [detalle,setDetalle]=useState(null)
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const nuevo=()=>{
    setOpenregistroingreso(true)
  }
  const eliminar=()=>{
    console.log(selectedRowKeys)
    // setOpeneliminaringreso(true)
    
  }

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

                
  
        
          const registros=dataingresos
          
          if(Object.keys(registros).length>0){
            registros.forEach((elemento) => {
              
              elemento.key = elemento.id;
            })
            setDetalle(registros)
            
          }
          else{
            setDetalle([])
            
          }
          
          
          
        };
    
        cargardatos();
      }, [dataingresos]);
    


  const start = () => {
        setLoading(true);
        
        setTimeout(() => {setSelectedRowKeys([]);setLoading(false);}, 1000);
      };

  const onSelectChange = (newSelectedRowKeys) => {
        
        
        setSelectedRowKeys(newSelectedRowKeys);
        
      };
  const rowSelection = { selectedRowKeys, onChange: onSelectChange,};
  const handleOk = () => {
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
    };
    return(
        <div>
            
            <Table rowSelection={rowSelection} 
              columns={columns} 
              dataSource={detalle} 
              pagination={false}
              bordered
              summary={(pageData) => {
                let totalBorrow = 0;
                let totalRepayment = 0;
                pageData.forEach(({ monto_ingreso }) => {
                totalBorrow += monto_ingreso;
                totalRepayment +=1
                
                });
                return (
                <>
                    <Table.Summary.Row>
                        <Table.Summary.Cell index={0} colSpan={3} >
                            <Text type="danger" strong> CANT. REG : {totalRepayment} -  TOTAL INGRESOS {'>>>>>>>>>>>'}  </Text>
                        </Table.Summary.Cell>

                        <Table.Summary.Cell index={1} colSpan={1}>
                            <Text strong>GS. {Number(totalBorrow).toLocaleString('es-ES')}</Text>
                        </Table.Summary.Cell>

                        

                    </Table.Summary.Row>

                    
                </>
                );
              }}
            />

            <div className='contenedor-flex'>
                  
           

              <Button type="primary" icon={<DeleteOutlined/>} danger onClick={eliminar}> Eliminar </Button>
                    
                <Button type="primary" icon={<RetweetOutlined/> }  >Actualizar</Button>

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
                                          ></ModalRegistroIngreso>)}
                
            </div>

        </div>
    )


}
export default DetalleIngreso