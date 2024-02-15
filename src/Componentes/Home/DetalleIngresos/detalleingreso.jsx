import React, {useEffect, useState} from 'react';
import Generarpeticion from '../../../peticiones/apipeticiones';
import Handelstorage from '../../../Storage/handelstorage';
import { Space, Table, Tag } from 'antd';


// import './detalleingreso.css'
function DetalleIngreso({cargaringresos,setCargaringresos}){
    
    const[detalle,setDetalle]=useState(null)
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
     
        const cargardatos = async  () => {

          
          
          const datestorage=Handelstorage('obtenerdate');
          const mes_storage=datestorage['datames']
          const anno_storage=datestorage['dataanno']

          
        
          const body = {};
          const endpoint='MisIngresos/' + anno_storage +'/' + mes_storage + '/'
          
          const result = await Generarpeticion(endpoint, 'POST', body);
          
          const respuesta=result['resp']
          if (respuesta === 200) {
            
            const registros=result['data']
            
            if(Object.keys(registros).length>0){
              
              setDetalle(registros)
              
            }
            else{
              setDetalle([])
              
            }

            

          } else {
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            // navigate('/');
          }
          
        };
    
        cargardatos();
      }, [cargaringresos]);


      return(
        <div>
            
            <Table columns={columns} dataSource={detalle} pagination={false}/>

        </div>
    )


}
export default DetalleIngreso