import React, {useEffect, useState} from 'react';
import { Button, Table  } from 'antd';
import { DeleteOutlined,    RetweetOutlined  ,PlusCircleTwoTone  } from '@ant-design/icons';
import Modalconfirm from './confirmmodal';
import Modalnew from './newmodal';
import './detalleegreso.css'
import { Navigate, useNavigate } from "react-router-dom";
import Handelstorage from '../../../Storage/handelstorage';
import Generarpeticion from '../../../peticiones/apipeticiones';

function DetalleEgreso({cargaregresos,setCargarEgresos,setDataresumen}){
    const navigate=useNavigate()
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [detalle,setDetalle]=useState(null)
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [openmodalconfirm, setOpenmodalconfirm] = useState(false);
    const [openmodalnew, setOpenmodalnew] = useState(false);
    
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
        setOpenmodalconfirm(true)
        
      }

    const actualizar=()=>{
        const ultimoElemento = selectedRowKeys[selectedRowKeys.length - 1];
        

      }

      const nuevo=()=>{
        console.log('nuevo')
        setOpenmodalnew(true)
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
            
            <div> <Table rowSelection={rowSelection} columns={columns} dataSource={detalle} pagination={false}/></div>
              

            <div className='contenedor-flex'>
                  
           

              <Button type="primary" icon={<DeleteOutlined/>} danger onClick={eliminar}> Eliminar </Button>
                    
                <Button type="primary" icon={<RetweetOutlined/> } onClick={actualizar}>Actualizar</Button>

                <Button type="primary" icon={<PlusCircleTwoTone/>} onClick={nuevo} >Agregar</Button>

                
                {openmodalconfirm &&( <Modalconfirm openmodalconfirm={openmodalconfirm} 
                                                    setOpenmodalconfirm={setOpenmodalconfirm} 
                                                    cargaregresos={cargaregresos}
                                                    setCargarEgresos={setCargarEgresos} 
                                                    
                                                    selectedRowKeys={selectedRowKeys}  
                                      ></Modalconfirm>)}

                {openmodalnew &&( <Modalnew openmodalnew={openmodalnew} 
                                            setOpenmodalnew={setOpenmodalnew} 
                                            cargaregresos={cargaregresos} 
                                            setCargarEgresos={setCargarEgresos}  
                                            setDataresumen={setDataresumen}
                                            ></Modalnew>)}
                
            </div>
           

        </div>
    )


}
export default DetalleEgreso