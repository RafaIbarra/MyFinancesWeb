import React, {useEffect, useState} from 'react';
import { Button, Table, Typography,notification } from 'antd';
import { DeleteOutlined,RetweetOutlined,PlusCircleTwoTone,CheckOutlined,WarningOutlined} from '@ant-design/icons';
import Generarpeticion from '../../peticiones/apipeticiones';
import './productos.css'
const { Text } = Typography;
function Productosfinancieros(){
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [productos,setProductos]=useState([])
    const [totalproductos,setTotalproductos]=useState(0)
    const [cantidadproductos,setCantidadproductos]=useState(0)
    const [cargaconfirmada,setCargaconfirmada]=useState(false)

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
                    setDetalle([])
                    
                  }
                
                
            }
            setCargaconfirmada(true)
          };
          
    
        cargardatos();
      }, []);
    const start = () => {
        setLoading(true);
        
        setTimeout(() => {setSelectedRowKeys([]);setLoading(false);}, 1000);
      };

    const onSelectChange = (newSelectedRowKeys) => {
        
         setSelectedRowKeys(newSelectedRowKeys);
          
      };
      const rowSelection = { selectedRowKeys, onChange: onSelectChange,};
    return(
        <div>
             <Table 
              rowSelection={rowSelection} 
              scroll={{y: 400,}}
              columns={columns} 
              dataSource={productos} 
              pagination={false}
              bordered
            />


            <div className='contenedor-flex'>

                    <Button type="primary" 
                            icon={<CheckOutlined /> } 
                            // onClick={ errorcantidadunica ? () => mensajeregistrounico('top','vista detalle') : detalleregistro}
                            > Detalle
                    </Button>

                    <Button type="primary" 
                            icon={<DeleteOutlined/>} 
                            danger 
                            
                            // onClick={ erroreliminarcion ? () => mensajeControlEliminacion('top') : eliminar}
                            > 
                            Eliminar 
                    </Button>
                        
                    <Button type="primary" 
                            icon={<RetweetOutlined/> }  
                            // onClick={ errorcantidadunica ? () => mensajeregistrounico('top','actualizacion') : actualizar}
                            >
                            Actualizar
                    </Button>

                    <Button type="primary" 
                            icon={<PlusCircleTwoTone/>} 
                            // onClick={nuevo} 
                            >Agregar
                    </Button>


                   

                    </div>
            </div>
    )
}

export default Productosfinancieros