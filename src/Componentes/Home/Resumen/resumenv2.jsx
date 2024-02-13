import React, {useEffect, useState} from 'react';
import Generarpeticion from '../../../peticiones/apipeticiones';
import Resumengrafico from './resumengrafico';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Table, Typography } from 'antd';
const { Text } = Typography;

// import './resumen.css'
function Resumen({mes,anno}){
    const[datos,setDatos]=useState(null)
    const[detalle,setDetalle]=useState(null)
    const[totalingreso,setTotalingreso]=useState(null)
    const[totalegreso,setTotalegreso]=useState(null)
    const[saldo,setSaldo]=useState(null)
    const mostrardatos=(evente)=>{
        console.log(datos)
    }
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
    
        const cargardatos = async () => {
          const body = {};
          const endpoint='Balance/' + anno +'/' + mes + '/'
          const result = await Generarpeticion(endpoint, 'POST', body);
          
          const respuesta=result['resp']
          if (respuesta === 200) {
            const registros=result['data']
            const registrosdetalle=registros.filter((item) => item.Codigo !== 3)
            const registroresumen=registros.filter((item) => item.Codigo === 3)
            
            setDetalle(registrosdetalle)
            setTotalingreso(registroresumen[0]['MontoIngreso'])
            setTotalegreso(registroresumen[0]['MontoEgreso'])
            setSaldo(registroresumen[0]['Saldo'])
          } else {
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            // navigate('/');
          }
        };
    
        cargardatos();
      }, []);


      return(
        <div>
            

            <Table
                columns={columns}
                dataSource={detalle}
                pagination={false}
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

                
                <Resumengrafico></Resumengrafico>

                


        </div>
    )


}
export default Resumen
