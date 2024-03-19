import React, {useEffect, useState} from 'react';
import { Table, Typography } from 'antd';
const { Text } = Typography;
import './saldosperiodo.css'
function SaldosPeriodo({datasaldos}){
    const[detallesaldos,setDetallesaldos]=useState(null)
    const [totalingresosaldo,setTotalingresosaldo]=useState(0)
    const [totalegresosaldo,setTotalegresosaldo]=useState(0)
    const [totalsaldos,setTotalsaldos]=useState(0)
    const [porcentajetotal,setPorcentajetotal]=useState(0)
    const columns=[
        { title: 'Año',dataIndex: 'AnnoOperacion',key: 'AnnoOperacion'},
        { title: 'Mes',dataIndex: 'NombreMesOperacion',key: 'NombreMesOperacion'},

        { title: 'Total Ingreso',
          dataIndex: 'TotalIngreso',
          key: 'TotalIngreso',
          render: (TotalIngreso) => (
            <span>
              Gs. {Number(TotalIngreso).toLocaleString('es-ES')}
            </span>
          ),
        },
    
        { title: 'Total Egreso',
          dataIndex: 'TotalEgreso',
          key: 'TotalEgreso',
          render: (TotalEgreso) => (
            <span>
              Gs. {Number(TotalEgreso).toLocaleString('es-ES')}
            </span>
          ),
        },


        { title: 'Saldo',
          dataIndex: 'Saldo',
          key: 'Saldo',
          render: (Saldo) => (
            <span>
              Gs. {Number(Saldo).toLocaleString('es-ES')}
            </span>
          ),
        },

        { title: 'Porcentaje Saldo',
        dataIndex: 'PorcentajeSaldo',
        key: 'PorcentajeSaldo',
        render: (PorcentajeSaldo) => (
            <span>
              {PorcentajeSaldo} %
            </span>
          ),
      },

      ]

    useEffect(() => {
    
        const cargardatos =  () => {
          
         
            const registros=datasaldos
            if(Object.keys(registros).length>0){
              
                

                registros.forEach((elemento) => {
                  
                  elemento.key = elemento.Periodo;
                })

                

                let totalgasto=0
                let totalingreso=0
                let totalsaldo=0
                
                registros.forEach(({ TotalEgreso }) => {totalgasto += TotalEgreso})
                registros.forEach(({ TotalIngreso }) => {totalingreso += TotalIngreso})
                registros.forEach(({ Saldo }) => {totalsaldo += Saldo})
                const porcentajeglobal=totalsaldo*100/totalingreso
                setPorcentajetotal(porcentajeglobal.toFixed(2))
                setTotalingresosaldo(totalingreso)
                setTotalegresosaldo(totalgasto)
                setTotalsaldos(totalsaldo)
                setDetallesaldos(registros)
               
            }
            else{
                setDetallesaldos(null)
        
            }
          }
          
           
        
    
        cargardatos();
      }, [datasaldos]);

    return(
        <div className='contenedor-resumen-saldos-flex'>
            
        <div className='contenedor-tabla-saldos'>

          <Table
              columns={columns}
              dataSource={detallesaldos}
              pagination={false}
              size="small"
              bordered
              summary={(pageData) => {
                  let totalBorrow = 0;
                  let totalRepayment = 0;
                  pageData.forEach(({ TotalIngreso, TotalEgreso }) => {
                  totalBorrow += TotalIngreso;
                  totalRepayment += TotalEgreso;
                  });
                  return (
                  <>
                      <Table.Summary.Row>
                          <Table.Summary.Cell index={0} colSpan={2} >
                              <Text type="danger" strong>TOTALES </Text>
                          </Table.Summary.Cell>

                          <Table.Summary.Cell index={1}>
                              <Text strong>GS. {Number(totalingresosaldo).toLocaleString('es-ES')}</Text>
                          </Table.Summary.Cell>

                          <Table.Summary.Cell index={2}>
                              <Text strong>GS. {Number(totalegresosaldo).toLocaleString('es-ES')}</Text>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={3}>
                              <Text  type="danger"strong>GS. {Number(totalsaldos).toLocaleString('es-ES')}</Text>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={4}>
                              <Text  strong>{porcentajetotal} %</Text>
                          </Table.Summary.Cell>

                      </Table.Summary.Row>

                         
                  </>
                  );
              }}
              />
        </div>

              
        

              


      </div>
    )

}
export default SaldosPeriodo