import React, {useEffect, useState} from 'react';
import Generarpeticion from '../../../peticiones/apipeticiones';
import Handelstorage from '../../../Storage/handelstorage';
import Resumengrafico from './resumengrafico';

import { Table, Typography } from 'antd';
const { Text } = Typography;

import './resumen.css'
function Resumen({dataresumen}){
    
    // const[datos,setDatos]=useState(null)
    const[detalle,setDetalle]=useState(null)
    const[totalingreso,setTotalingreso]=useState(null)
    const[totalegreso,setTotalegreso]=useState(null)
    const[saldo,setSaldo]=useState(null)
    
    const columns=[
        { title: 'Descripcion',dataIndex: 'Descripcion',key: 'Descripcion'},
        { title: 'Tipo',dataIndex: 'Tipo',key: 'Tipo'},

        { title: 'Ingreso',
          dataIndex: 'MontoIngreso',
          key: 'Ingreso',
          render: (MontoIngreso) => (
            <span>
              Gs. {Number(MontoIngreso).toLocaleString('es-ES')}
            </span>
          ),
        },
    
        { title: 'Egreso',
          dataIndex: 'MontoEgreso',
          key: 'Egreso',
          render: (MontoEgreso) => (
            <span>
              Gs. {Number(MontoEgreso).toLocaleString('es-ES')}
            </span>
          ),
        },
      ]
      
      const fixedData = [];
        for (let i = 0; i < 20; i += 1) {
        fixedData.push({
            key: i,
            name: ['Light', 'Bamboo', 'Little'][i % 3],
            description: 'Everything that has a beginning, has an end.',
        });
        }

      
    useEffect(() => {
    
        const cargardatos =  () => {
          
         
            const registros=dataresumen
            if(Object.keys(registros).length>0){
              
                

                registros.forEach((elemento) => {
                  
                  elemento.key = elemento.Descripcion;
                })

                

                const registrosdetalle=registros.filter((item) => item.Codigo !== 3)
                const registroresumen=registros.filter((item) => item.Codigo === 3)
                const datosFiltrados = registrosdetalle.filter(item => item.MontoIngreso + item.MontoEgreso > 0);
                setDetalle(datosFiltrados)
                setTotalingreso(registroresumen[0]['MontoIngreso'])
                setTotalegreso(registroresumen[0]['MontoEgreso'])
                setSaldo(registroresumen[0]['Saldo'])
            }
            else{
              setDetalle(null)
              setTotalingreso(0)
              setTotalegreso(0)
              setSaldo(0)
            }
          }
          
           
        
    
        cargardatos();
      }, [dataresumen]);

      // className='contenedor-resumen-flex'
      return(
        <div className='contenedor-resumen-flex'>
            
          <div className='contenedor-tabla'>

            <Table
                columns={columns}
                dataSource={detalle}
                pagination={false}
                size="small"
                bordered
                summary={(pageData) => {
                    let totalBorrow = 0;
                    let totalRepayment = 0;
                    pageData.forEach(({ MontoIngreso, MontoEgreso }) => {
                    totalBorrow += MontoIngreso;
                    totalRepayment += MontoEgreso;
                    });
                    return (
                    <>
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0} colSpan={2} >
                                <Text type="danger" strong>TOTALES </Text>
                            </Table.Summary.Cell>

                            <Table.Summary.Cell index={1}>
                                <Text strong>GS. {Number(totalingreso).toLocaleString('es-ES')}</Text>
                            </Table.Summary.Cell>

                            <Table.Summary.Cell index={2}>
                                <Text strong>GS. {Number(totalegreso).toLocaleString('es-ES')}</Text>
                            </Table.Summary.Cell>

                        </Table.Summary.Row>

                            <Table.Summary.Row>
                            <Table.Summary.Cell index={0}>
                                <Text type="danger" strong>SALDO </Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1} colSpan={3}>
                                <Text type="danger"strong>GS. {Number(saldo).toLocaleString('es-ES')}</Text>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    </>
                    );
                }}
                />
          </div>

                
          <Resumengrafico dataresumen={dataresumen}></Resumengrafico>

                


        </div>
    )


}
export default Resumen
