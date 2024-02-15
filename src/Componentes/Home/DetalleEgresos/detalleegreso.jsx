import React, {useEffect, useState} from 'react';
import Generarpeticion from '../../../peticiones/apipeticiones';
import { Space, Table, Tag } from 'antd';



import './detalleegreso.css'
function DetalleEgreso({datosegresos}){
    
    const[detalle,setDetalle]=useState(null)
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
       
        const cargardatos =  () => {
          
          setDetalle(datosegresos)
        };
    
        cargardatos();
      }, [datosegresos]);


      return(
        <div>
            
           

          <Table key='DetalleEgreso_table' columns={columns} dataSource={detalle} pagination={false} />
            






        </div>
    )


}
export default DetalleEgreso