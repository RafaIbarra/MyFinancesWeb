import React, {useEffect, useState} from 'react';
import {  Table, Typography  } from 'antd';
const { Text } = Typography;

import './comportamiento.css'
function Comportamiento({datos15dias}){
    const [imagen15, setImagen15] = useState(null);
    const [cantidadregistros,setCantidadregistros]=useState(0)
    const [cantidadveces,setCantidadveces]=useState(0)
    const [categoria,setCategoria]=useState('')
    const [porcentaje,setPorcentaje]=useState('')
    const [detalleperdiodo,setDetalleperiodo]=useState([])

    const columns=[
      
        { title: 'Periodo',
          dataIndex: 'Periodo',
          key: 'Periodo',
          
        },
        { title: 'Categoria',
          dataIndex: 'CategoriaGasto',
          key: 'Categoria',
          
        },
  
        { title: 'Total Gasto',
          dataIndex: 'monto_gasto', 
          key: 'DetalleEgreso_Categoria',
          render: (monto_gasto) => (
            <span>
              Gs. {Number(monto_gasto).toLocaleString('es-ES')}
            </span>
          ),
        
        },
  
        
      ]
    useEffect(() => {
        
        const cargardatos =  () => {
            
          
            setImagen15(datos15dias.grafico)
            setCantidadregistros(datos15dias['DatosMayorCategoria'].CantidadRegistros)
            setCantidadveces(datos15dias['DatosMayorCategoria'].CantidadVeces)
            setCategoria(datos15dias['DatosMayorCategoria'].Categoria)
            setPorcentaje(datos15dias['DatosMayorCategoria'].Porcentaje)

            // console.log(datos15dias['detalles'][0])
            let valores=[]
            const data=datos15dias['detalles']
            data.forEach((detalle) => {
                // Aquí puedes realizar cualquier procesamiento necesario con cada detalle
              
                const valor = {
                  Periodo: detalle[0].Periodo,
                  CategoriaGasto: detalle[0].CategoriaGasto,
                  monto_gasto: detalle[0].monto_gasto,
                  key:detalle[0].Periodo
                };
              
                valores.push(valor);
              });
            
            

            
            setDetalleperiodo(valores)
               

  
            
          };
          
    
        cargardatos();
      }, []);

    return(
        <div className='contenedor-flex-estadistica-dias'>

            
            <div className='contenedor-estadistica-dias-texto'>
                <p style={{width: '100%'}}>
                {`Teniendo en cuenta los 15 primeros dias de cada periodo, se encuentra que el `}
                <strong><em>{`${porcentaje}%`}</em></strong>
                {` de las veces, la categoría en la que más se gastó fue en `} 
                <strong><em>{`${categoria}`}</em></strong>
                { `, con un total de veces de ${cantidadveces}.
                
                Con la cantidad de registros de: ${Number(cantidadregistros).toLocaleString('es-ES')}.`}
               </p>
               <Table size="small"
                    columns={columns} 
                    dataSource={detalleperdiodo} 
                    pagination={false}
                    scroll={{x: 300,y: 200,}}
                    bordered={true}
                />
            </div>
            <div className='contenedor-imagen-dias'>
                <img 
                    src={`data:image/png;base64,${imagen15}`}
                    alt="Descripción de la imagen"
                    className='imagen-dias'
                />
            </div>
        </div>
    )


}

export default Comportamiento