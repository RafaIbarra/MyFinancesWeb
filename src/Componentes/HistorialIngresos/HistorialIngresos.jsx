import React, {useEffect, useState} from 'react';
import {  Table, Typography,Divider,Form,Input   } from 'antd';
import { Navigate, useNavigate } from "react-router-dom";
import Generarpeticion from '../../peticiones/apipeticiones';

import './historialingreso.css'
const { Text } = Typography;

function HistorialIngresos(){
    const navigate=useNavigate()
    const [dataingresosoriginal,setDataingresosoriginal]=useState([])
    const [dataingresos,setDataingresos]=useState([])
    const [dataagrupacion,setDataagrupacion]=useState([])
    const [textobusqueda,setTextobusqueda]=useState('')
    const [customSize,setCustomSize]=useState('10')
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

    const tomarbusqueda=(event)=>{
      const valor=event.target.value;
      const valor_busqueda=valor.toLowerCase()
      
      const arrayencontrado=dataingresosoriginal.filter(item=> item.NombreIngreso.toLowerCase().includes(valor_busqueda))
      // console.log(arrayencontrado)
      setDataingresos(arrayencontrado)
    }

    useEffect(() => {
        
        const cargardatos = async () => {
        
            const body = {};
            const endpoint='MisIngresos/0/0/'
            const result = await Generarpeticion(endpoint, 'POST', body);
            
            const respuesta=result['resp']
            
            if (respuesta === 200) {

                const registros=result['data']['detalles']
                
                
                
                if(Object.keys(registros).length>0){
                    registros.forEach((elemento) => {
                      
                      elemento.key = elemento.id;
                    })
                    
                    setDataingresos(registros)
                    setDataingresosoriginal(registros)
                    const agrupacion=result['data']['agrupados']
                    console.log(agrupacion)
                    if(Object.keys(agrupacion).length>0){

                      agrupacion.forEach((ele) => {
                      
                        ele.key = ele.AnnoIngreso.toString() + ele.MesIngreso.toString();
                      })


                    }
                    
                    setDataagrupacion(agrupacion)
                    
                    
                  }
                  else{
                    
                    setDataingresos([])
                    
                  }
                
                
            }else if(respuesta === 403 || respuesta === 401){
              
              
              navigate('/Closesesion')

          }
            
            
          };
          
    
        cargardatos();
      }, []);

      return (
        <div className='contenedor-principal'>

          <div className='contenedor-principal-datos'>

            {dataagrupacion && dataagrupacion.map((x, index) => {
                // Filtrar detalles de ingresos
                const lista = dataingresos.filter((pro) => pro.AnnoIngreso === x.AnnoIngreso && pro.MesIngreso === x.MesIngreso);
                if(lista.length>0){

                  return (
                
                      <div className='contenedor-sub' key={x.key}>
                        <div className='texo-contenedor'>
                          <h4 style={{marginLeft:'30px',marginBottom: '0.5px'}}>{x.AnnoIngreso} {x.MesIngreso}</h4>
                        </div>
                          <div className='texo-tabla'> 
  
                              <Table size="small"
                                columns={columns} 
                                dataSource={lista} 
                                pagination={false}
                                scroll={{x: 300,y: 200,}}
                                bordered={true}
                              />
                          </div>
                          <Divider type="horizontal" />
                          
                          
                      </div>
                    
                    
                  );
                }




              })}
          </div>

            <div>
              <Input placeholder='ingreso busqueda' onChange={tomarbusqueda} style={{width:'100%'}} ></Input>
            </div>
        </div>
      );

}
export default HistorialIngresos
