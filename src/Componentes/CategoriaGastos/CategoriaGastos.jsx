import React, {useEffect, useState} from 'react';
import { Button, Table, Typography,notification } from 'antd';
import { DeleteOutlined,RetweetOutlined,PlusCircleTwoTone,CheckOutlined,WarningOutlined} from '@ant-design/icons';
import ModalRegistroCategoria from './modal_registro_categoria';
// import ModalRegistroGasto from './modal_registro_gastos';
// import ModalEliminarGastos from './modal_eliminar_gastos';

import Generarpeticion from '../../peticiones/apipeticiones';
// import './gastos.css'
import FormItem from 'antd/es/form/FormItem';
import { Navigate, useNavigate } from "react-router-dom";

const { Text } = Typography;

function CategoriaGasto(){
    const navigate=useNavigate()
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [cargarcomponentecategoria,setCargarcomponentecategoria]=useState(false)
    const [categorias,setCategorias]=useState([])
    const [erroreliminarcion, setErroreliminacion]=useState(false)
    const [errorcantidadunica, setErrorcantidadunica]=useState(true)
    const [mesajecantidadunica, setMesajecantidadunica]=useState('')
    const [modoedicioncategoria,setModoedicioncategoria]=useState(false)
    const [detalleseleccioncategoria,setDetalleseleccioncategoria]=useState([])

    const [openeliminarcategoria, setOpeneliminarcategoria] = useState(false);
    const [openregistrocategoria, setOpenregistrocategoria] = useState(false);

    const nuevo=()=>{
        setDetalleseleccioncategoria([])
        setOpenregistrocategoria(true)
        setModoedicioncategoria(false)
      }

    const eliminar=()=>{
        
        setOpeneliminarcategoria(true)
        
      }

    const detalleregistro=()=>{
        
        const ultimoElemento = selectedRowKeys[selectedRowKeys.length - 1];
        
        const detallesel=categorias.filter((item) => item.id ===ultimoElemento)
        setDetalleseleccioncategoria(detallesel)
        setOpenregistrocategoria(true)
        setModoedicioncategoria(true)
  
        // const registrosdetalle=registros.filter((item) => item.Codigo !== 3)
  
      }

    const actualizar=()=>{
          
        const ultimoElemento = selectedRowKeys[selectedRowKeys.length - 1];
        
        const detallesel=categorias.filter((item) => item.id ===ultimoElemento)
        setDetalleseleccioncategoria(detallesel)
        setOpenregistrocategoria(true)
        setModoedicioncategoria(false)
  
        // const registrosdetalle=registros.filter((item) => item.Codigo !== 3)
  
      }


    const columns=[
        { title: 'Codigo',
          dataIndex: 'id',
          key: 'id_gast',
          width:'100px',
          defaultSortOrder: 'ascend',
          sorter: (a, b) => a.id - b.id,
        },

        { title: 'Nombre Categoria',
          dataIndex: 'nombre_categoria',
          key: 'nombre_gasto',
          
          sorter: (a, b) => a.nombre_categoria.localeCompare(b.nombre_categoria),
        },


        // { title: 'Monto Total Registrado',
        //   dataIndex: 'TotalEgresos',
        //   key: 'TotalEgresos',
        //   render: (TotalEgresos) => (
        //     <span>
        //       Gs. {Number(TotalEgresos).toLocaleString('es-ES')}
        //     </span>
        //   ),
        // },
        // { title: 'Cantidad Registros',dataIndex: 'CantidadRegistros',key: 'CantidadRegistros'},
        { title: 'Fecha Registro',dataIndex: 'fecha_registro',key: 'FechaRegistro_i'}
        // ,
        
      ]



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


    useEffect(() => {
        
        const cargardatos = async () => {
        
            const body = {};
            const endpoint='MisCategorias/'
            const result = await Generarpeticion(endpoint, 'POST', body);
            
            const respuesta=result['resp']
            
            if (respuesta === 200) {
                const registros=result['data']
                
                if(Object.keys(registros).length>0){
                    registros.forEach((elemento) => {
                        
                        elemento.key = elemento.id;
                    })
                    // let totalprod=0
                    // let cantprod=0
                    // registros.forEach(({ TotalEgresos }) => {totalprod += TotalEgresos,cantprod+=1})
                    // setTotalgastos(totalprod)
                    // setCantidadgastos(cantprod)
                    console.log(registros)
                    setCategorias(registros)
                    
                    
                    }
                    else{
                    
                        setCategorias([])
                    
                    }
                
                
            } else if(respuesta === 403 || respuesta === 401){
                
                navigate('/Closesesion')

            }
            setErroreliminacion(true)
            setErrorcantidadunica(true)
            setMesajecantidadunica('seleccione el registro')
            setModoedicioncategoria(false)
            setCargarcomponentecategoria(true)
            
            };
              
        
            cargardatos();
        }, [cargarcomponentecategoria]);

    const start = () => {
        setLoading(true);
        
        setTimeout(() => {setSelectedRowKeys([]);setLoading(false);}, 1000);
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

    const mensajeControlEliminacion = (placement) => {
        api.open({
            message: 'ERROR',
            
            description:
                'Debe seleccionar uno o mas registros de categorias para eliminar!!.',
                placement,
            icon: (<WarningOutlined style={{color: 'red',}}/>
            ),
            });
        };

    const rowSelection = { selectedRowKeys, onChange: onSelectChange,};

    if(cargarcomponentecategoria){
        return(
            <div>
                {contextHolder}
                <h4 className='tituloform' > Categorias Definidas </h4>
                <Table 
                    rowSelection={rowSelection} 
                    scroll={{x: 300,y: 400,}}
                    size="small"
                    columns={columns} 
                    dataSource={categorias} 
                    pagination={false}
                    bordered
                    // onChange={onChange}
                  />
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
                    {/* {openeliminargasto &&( <ModalEliminarGastos 
                                openeliminargasto={openeliminargasto}
                                setOpeneliminargasto={setOpeneliminargasto}
                                selectedRowKeys={selectedRowKeys}
                                cargarcomponentesgasto={cargarcomponentesgasto}
                                setCargarcomponentesgasto={setCargarcomponentesgasto} 
                                ></ModalEliminarGastos>)} */}


                    {openregistrocategoria &&( <ModalRegistroCategoria 
                                        openregistrocategoria={openregistrocategoria} 
                                        setOpenregistrocategoria={setOpenregistrocategoria} 
                                        detalleseleccioncategoria={detalleseleccioncategoria}
                                        modoedicioncategoria={modoedicioncategoria}
                                        cargarcomponentecategoria={cargarcomponentecategoria}
                                        setCargarcomponentecategoria={setCargarcomponentecategoria}
                                        ></ModalRegistroCategoria>
                                        )}


                

                </div>
            </div>
        )
    }



}
export default CategoriaGasto