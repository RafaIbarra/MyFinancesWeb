import React, {useEffect, useState} from 'react';
import { Button, Table, Typography,notification } from 'antd';
import { DeleteOutlined,RetweetOutlined,PlusCircleTwoTone,CheckOutlined,WarningOutlined} from '@ant-design/icons';
import ModalRegistroProducto from './modal_registro_productos';
import ModalEliminarProducto from './modal_eliminar_producto';
import Generarpeticion from '../../peticiones/apipeticiones';
import './productos.css'
import FormItem from 'antd/es/form/FormItem';
import { Navigate, useNavigate } from "react-router-dom";
import '../../Componentes/estilosgenerales.css'

const { Text } = Typography;
function Productosfinancieros(){
    const navigate=useNavigate()
    const [api, contextHolder] = notification.useNotification();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [productos,setProductos]=useState([])
    const [totalproductos,setTotalproductos]=useState(0)
    const [cantidadproductos,setCantidadproductos]=useState(0)
    // const [cargaconfirmada,setCargaconfirmada]=useState(false)

    const [detalleseleccionproducto,setDetalleseleccionproducto]=useState([])

    const [openeliminarproducto, setOpeneliminarproducto] = useState(false);
    const [openregistroproducto, setOpenregistroproducto] = useState(false);

    const [erroreliminarcion, setErroreliminacion]=useState(false)
    const [errorcantidadunica, setErrorcantidadunica]=useState(true)
    const [mesajecantidadunica, setMesajecantidadunica]=useState('')
    const [modoedicionproducto,setModoedicionproducto]=useState(false)

    const [cargarcomponentesproductos,setCargarcomponentesproductos]=useState(false)

    

    const columns=[
        { title: 'Codigo',dataIndex: 'id',key: 'id_prod',width:'100px'},
        { title: 'Nombre Producto',dataIndex: 'nombre_producto',key: 'nombre_producto'},
        { title: 'Tipo',dataIndex: 'DescripcionTipoProducto',key: 'DescripcionTipoProducto'},
        { title: 'Monto Total Registrado',
          dataIndex: 'TotalIngresos',
          key: 'TotalIngresos',
          render: (TotalIngresos) => (
            <span>
              Gs. {Number(TotalIngresos).toLocaleString('es-ES')}
            </span>
          ),
        },
        { title: 'Cantidad Registros',dataIndex: 'CantidadRegistros',key: 'CantidadRegistros'},
        { title: 'Fecha Registro',dataIndex: 'fecha_registro',key: 'FechaRegistro_i'},
        
      ]

    const nuevo=()=>{
        setDetalleseleccionproducto([])
        setOpenregistroproducto(true)
        setModoedicionproducto(false)
      }

    const eliminar=()=>{
    
      setOpeneliminarproducto(true)
        
      }

    const detalleregistro=()=>{
        
        const ultimoElemento = selectedRowKeys[selectedRowKeys.length - 1];
        
        const detallesel=productos.filter((item) => item.id ===ultimoElemento)
        setDetalleseleccionproducto(detallesel)
        setOpenregistroproducto(true)
        setModoedicionproducto(true)
  
        // const registrosdetalle=registros.filter((item) => item.Codigo !== 3)
  
      }
    const actualizar=()=>{
          
        const ultimoElemento = selectedRowKeys[selectedRowKeys.length - 1];
        
        const detallesel=productos.filter((item) => item.id ===ultimoElemento)
        setDetalleseleccionproducto(detallesel)
        setOpenregistroproducto(true)
        setModoedicionproducto(false)
  
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
            const endpoint='MisProductosFinancieros/'
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
                    registros.forEach(({ TotalIngresos }) => {totalprod += TotalIngresos,cantprod+=1})
                    setTotalproductos(totalprod)
                    setCantidadproductos(cantprod)
                    
                    setProductos(registros)
                    
                    
                  }
                  else{
                    
                    setProductos([])
                    
                  }
                
                
            }else if(respuesta === 403 || respuesta === 401){
              
              
              navigate('/Closesesion')

          }
            setErroreliminacion(true)
            setErrorcantidadunica(true)
            setMesajecantidadunica('seleccione el registro')
            setModoedicionproducto(false)
            setCargarcomponentesproductos(true)
            
          };
          
    
        cargardatos();
      }, [cargarcomponentesproductos]);
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
    if (cargarcomponentesproductos){

        return(
            <div>
                  {contextHolder}
                  <h4 className='tituloform' > Conceptos de Ingresos </h4>
                  <Table 
                    rowSelection={rowSelection} 
                    scroll={{x: 300,y: 400,}}
                    size="small"
                    columns={columns} 
                    dataSource={productos} 
                    pagination={false}
                    bordered={true}
                  />
                  <div className='contenedor-resumen'>
                      <FormItem >
                        <Text strong>CANTIDAD REGISTROS: </Text>
                        <Text strong>   {Number(cantidadproductos).toLocaleString('es-ES')}</Text>
                          
                      </FormItem>
    
                      <FormItem >
                          <Text strong>TOTAL INGRESOS: </Text>
                          <Text strong>GS. {Number(totalproductos).toLocaleString('es-ES')}</Text>
                          
                      </FormItem>
    
                  </div>
    
                  <div className='contenedor-flex'>
    
                          <Button type="primary" 
                                  icon={<CheckOutlined /> } 
                                  onClick={ errorcantidadunica ? () => mensajeregistrounico('top','vista detalle') : detalleregistro}
                                  className='botonera'
                                  > Detalle
                          </Button>
    
                          <Button type="primary" 
                                  icon={<DeleteOutlined/>} 
                                  danger 
                                  className='botonera'
                                  onClick={ erroreliminarcion ? () => mensajeControlEliminacion('top') : eliminar}
                                  > 
                                  Eliminar 
                          </Button>
                              
                          <Button type="primary" 
                                  icon={<RetweetOutlined/> }  
                                  onClick={ errorcantidadunica ? () => mensajeregistrounico('top','actualizacion') : actualizar}
                                  className='botonera'
                                  >
                                  Actualizar
                          </Button>
    
                          <Button type="primary" 
                                  icon={<PlusCircleTwoTone/>} 
                                  onClick={nuevo} 
                                  className='botonera'
                                  >Agregar
                          </Button>
                          {openeliminarproducto &&( <ModalEliminarProducto 
                                        openeliminarproducto={openeliminarproducto}
                                        setOpeneliminarproducto={setOpeneliminarproducto}
                                        selectedRowKeys={selectedRowKeys}
                                        cargarcomponentesproductos={cargarcomponentesproductos}
                                        setCargarcomponentesproductos={setCargarcomponentesproductos} 
                                      ></ModalEliminarProducto>)}

    
                          {openregistroproducto &&( <ModalRegistroProducto 
                                              openregistroproducto={openregistroproducto} 
                                              setOpenregistroproducto={setOpenregistroproducto} 
                                              setProductos={setProductos}
                                              detalleseleccionproducto={detalleseleccionproducto}
                                              modoedicionproducto={modoedicionproducto}
                                              cargarcomponentesproductos={cargarcomponentesproductos}
                                              setCargarcomponentesproductos={setCargarcomponentesproductos}
                                              ></ModalRegistroProducto>
                                              )}
    
    
                        
    
                  </div>
            </div>
        )
    }
}

export default Productosfinancieros