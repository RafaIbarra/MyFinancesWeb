import React, {useEffect, useState} from 'react';
import Generarpeticion from '../../../peticiones/apipeticiones';
import { Space, Table, Tag } from 'antd';



import './detalleegreso.css'
function DetalleEgreso({mes,anno}){
    
    const[detalle,setDetalle]=useState(null)
    const columns=[
      { title: 'Descripcion',dataIndex: 'NombreGasto',key: 'Descripcion'},
      { title: 'Tipo',dataIndex: 'TipoGasto',key: 'Tipo'},
      { title: 'Categoria',dataIndex: 'CategoriaGasto', key: 'Categoria'},
      { title: 'Egreso',
        dataIndex: 'monto_gasto',
        key: 'Egreso',
        render: (monto_gasto) => (
          <span>
            Gs. {Number(monto_gasto).toLocaleString('es-ES')}
          </span>
        ),
      },
      { title: 'Fecha Gasto',dataIndex: 'fecha_gasto',key: 'FechaGasto'},
      { title: 'Fecha Registro',dataIndex: 'fecha_registro',key: 'FechaRegistro'},
      { title: 'Anotacion',dataIndex: 'anotacion',key: 'Anotacion'},
    ]
    

    
    useEffect(() => {
       
        const cargardatos = async () => {
          const body = {};
          const endpoint='MisEgresos/' + anno +'/' + mes + '/'
          const result = await Generarpeticion(endpoint, 'POST', body);
          
          const respuesta=result['resp']
          if (respuesta === 200) {
            
           
            setDetalle(result['data'])
            
          } else {
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            // navigate('/');
          }
        };
    
        cargardatos();
      }, []);


      return(
        <div>
            
            {/* <table className="bg-slate-50 min-w-full border-b px-4 py-2 rounded-lg border-collapse">
            <table className="bg-slate-50 min-w-full border-b px-4 py-2 rounded-lg border-collapse">
            <thead>
            <tr>
                <th className="border-b py-2 TitulosTamanho">Descripcion</th>
                <th className="border-b py-2 TitulosTamanho">Tipo</th>
                <th className="border-b py-2 TitulosTamanho">Categoria</th>
                <th className="border-b py-2 TitulosTamanho">Egreso</th>
                <th className="border-b py-2 TitulosTamanho">Fecha Gasto</th>
                <th className="border-b py-2 TitulosTamanho">Fecha Registro</th>
                <th className="border-b py-2 TitulosTamanho">Anotacion</th>
                <th className="border-b py-2"> </th>
            </tr>
            </thead>
            <tbody>
            {detalle && detalle.map((item, index) => (
                <tr key={index}>
                <td className="border-b px-2 py-2">{item.NombreGasto}</td>
                <td className="border-b px-2 py-2">{item.TipoGasto}</td>
                <td className="border-b px-2 py-2">{item.CategoriaGasto}</td>
                <td className="border-b px-2 py-2">GS. {Number(item.monto_gasto).toLocaleString('es-ES')}</td>
                <td className="border-b px-2 py-2">{item.fecha_gasto}</td>
                <td className="border-b px-2 py-2">{item.fecha_registro}</td>
                <td className="border-b px-2 py-2">{item.fecha_registro}</td>
                

                
                </tr>
            ))}
            </tbody>
            
            </table> */}

          <Table columns={columns} dataSource={detalle} pagination={false} />
            






        </div>
    )


}
export default DetalleEgreso