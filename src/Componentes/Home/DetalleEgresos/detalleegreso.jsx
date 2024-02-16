import React, {useEffect, useState} from 'react';
import { Button, Table,Typography  } from 'antd';
import { DeleteOutlined,    RetweetOutlined  ,PlusCircleTwoTone  } from '@ant-design/icons';
import ModalEliminarEgreso from './modal_eliminar_egreso';
import ModalRegistroEgreso from './modal_registro_egreso';
import './detalleegreso.css'
import { Navigate, useNavigate } from "react-router-dom";
import Handelstorage from '../../../Storage/handelstorage';
import Generarpeticion from '../../../peticiones/apipeticiones';
const { Text } = Typography;
function DetalleEgreso({cargaregresos,setCargarEgresos,setDataresumen}){
    const navigate=useNavigate()
    
    const [detalle,setDetalle]=useState(null)
    
    const [openeliminaregreso, setOpeneliminaregreso] = useState(false);
    const [openregistroegreso, setOpenregistroegreso] = useState(false);
    
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    
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
      { title: 'Fecha Registro',dataIndex: 'fecha_registro',key: 'DetalleEgreso_FechaRegistro'},
      { title: 'Anotacion',dataIndex: 'anotacion',key: 'DetalleEgreso_Anotacion'},
    ]
    

    
    useEffect(() => {
       
        const cargardatos =  async() => {

          
          const datestorage=Handelstorage('obtenerdate');
          const mes_storage=datestorage['datames']
          const anno_storage=datestorage['dataanno']
          const body = {};
          const endpoint='MisEgresos/' + anno_storage +'/' + mes_storage + '/'
          
          const result = await Generarpeticion(endpoint, 'POST', body);

          const respuesta=result['resp']

          if (respuesta === 200) {
            const registros=result['data']

            if(Object.keys(registros).length>0){

              registros.forEach((elemento) => {
                
                elemento.key = elemento.id;
              })
              
              setDetalle(registros)

            }else{
              setDetalle([])
              
            }

          } else {
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            // navigate('/');
          }

          
        };
    
        cargardatos();
      }, [cargaregresos]);



    const start = () => {
        setLoading(true);
        
        setTimeout(() => {setSelectedRowKeys([]);setLoading(false);}, 1000);
      };

    const onSelectChange = (newSelectedRowKeys) => {
        
        
        setSelectedRowKeys(newSelectedRowKeys);
        
      };

    const rowSelection = { selectedRowKeys, onChange: onSelectChange,};

      

    const eliminar=()=>{
        // console.log(selectedRowKeys)
        setOpeneliminaregreso(true)
        
      }

    const actualizar=()=>{
        const ultimoElemento = selectedRowKeys[selectedRowKeys.length - 1];
        

      }

    const nuevo=()=>{
        
      setOpenregistroegreso(true)
      }

    const showPopconfirm = () => {
        setOpen(true);
      };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
        }, 2000);
      };

    
    
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
      };
      
    return(
        <div>
            
            <div> 
              <Table 
                rowSelection={rowSelection} 
                columns={columns} 
                dataSource={detalle} 
                pagination={false}
                bordered
                summary={(pageData) => {
                  let totalBorrow = 0;
                  let totalRepayment = 0;
                  pageData.forEach(({ monto_gasto }) => {
                  totalBorrow += monto_gasto;
                  totalRepayment +=1
                  
                  });
                  return (
                  <>
                      <Table.Summary.Row>
                          <Table.Summary.Cell index={0} colSpan={4} >
                              <Text type="danger" strong> CANT. REG : {totalRepayment} -  TOTAL EGRESOS {'>>>>>>>>>>>'}  </Text>
                          </Table.Summary.Cell>

                          <Table.Summary.Cell index={1} colSpan={1}>
                              <Text strong>GS. {Number(totalBorrow).toLocaleString('es-ES')}</Text>
                          </Table.Summary.Cell>

                          

                      </Table.Summary.Row>

                      
                  </>
                  );
              }}
              
              />
              </div>
              

            <div className='contenedor-flex'>
                  
           

              <Button type="primary" icon={<DeleteOutlined/>} danger onClick={eliminar}> Eliminar </Button>
                    
                <Button type="primary" icon={<RetweetOutlined/> } onClick={actualizar}>Actualizar</Button>

                <Button type="primary" icon={<PlusCircleTwoTone/>} onClick={nuevo} >Agregar</Button>

                
                {openeliminaregreso &&( <ModalEliminarEgreso openeliminaregreso={openeliminaregreso} 
                                                    setOpeneliminaregreso={setOpeneliminaregreso} 
                                                    cargaregresos={cargaregresos}
                                                    setCargarEgresos={setCargarEgresos} 
                                                    selectedRowKeys={selectedRowKeys} 
                                                    setDataresumen={setDataresumen} 
                                      ></ModalEliminarEgreso>)}

                {openregistroegreso &&( <ModalRegistroEgreso openregistroegreso={openregistroegreso} 
                                            setOpenregistroegreso={setOpenregistroegreso} 
                                            cargaregresos={cargaregresos} 
                                            setCargarEgresos={setCargarEgresos}  
                                            setDataresumen={setDataresumen}
                                            ></ModalRegistroEgreso>)}
                
            </div>
           

        </div>
    )


}
export default DetalleEgreso