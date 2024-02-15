import React, {useEffect, useState} from 'react';
import Generarpeticion from '../../../peticiones/apipeticiones';

import { Space, Table, Tag } from 'antd';


// import './detalleingreso.css'
function DetalleIngreso({datosingreso}){
    
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
     
        const cargardatos =  () => {
          setDetalle(datosingreso)
        };
    
        cargardatos();
      }, [datosingreso]);


      return(
        <div>
            
            {/* <table className="bg-slate-50 min-w-full border-b px-4 py-2 rounded-lg border-collapse">
            
            <thead>
            <tr>
                <th className="border-b py-2 TitulosTamanho">Descripcion</th>
                <th className="border-b py-2 TitulosTamanho">Tipo</th>
                <th className="border-b py-2 TitulosTamanho">Ingreso</th>
                <th className="border-b py-2 TitulosTamanho">Fecha Ingreso</th>
                <th className="border-b py-2 TitulosTamanho">Fecha Registro</th>
                <th className="border-b py-2 TitulosTamanho">Anotacion</th>
                <th className="border-b py-2"> </th>
            </tr>
            </thead>
            <tbody>
            {detalle && detalle.map((item, index) => (
                <tr key={index}>
                <td className="border-b px-2 py-2">{item.NombreIngreso}</td>
                <td className="border-b px-2 py-2">{item.TipoIngreso}</td>
                <td className="border-b px-2 py-2">GS. {Number(item.monto_ingreso).toLocaleString('es-ES')}</td>
                <td className="border-b px-2 py-2">{item.fecha_ingreso}</td>
                <td className="border-b px-2 py-2">{item.fecha_registro}</td>
                <td className="border-b px-2 py-2">{item.anotacion}</td>
                

                
                </tr>
            ))}
            </tbody>
            
            </table> */}


            <Table columns={columns} dataSource={detalle} pagination={false}/>






        </div>
    )


}
export default DetalleIngreso