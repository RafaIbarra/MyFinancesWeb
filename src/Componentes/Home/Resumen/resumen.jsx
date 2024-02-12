import React, {useEffect, useState} from 'react';
import Generarpeticion from '../../../peticiones/apipeticiones';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';


import './resumen.css'
function Resumen({mes,anno}){
    const[datos,setDatos]=useState(null)
    const[detalle,setDetalle]=useState(null)
    const[totalingreso,setTotalingreso]=useState(null)
    const[totalegreso,setTotalegreso]=useState(null)
    const[saldo,setSaldo]=useState(null)
    const mostrardatos=(evente)=>{
        console.log(datos)
    }
    useEffect(() => {
        console.log(anno)   
        console.log(mes)   

        const cargardatos = async () => {
          const body = {};
          const endpoint='Balance/' + anno +'/' + mes + '/'
          const result = await Generarpeticion(endpoint, 'POST', body);
          
          const respuesta=result['resp']
          if (respuesta === 200) {
            const registros=result['data']
            const registrosdetalle=registros.filter((item) => item.Codigo !== 3)
            const registroresumen=registros.filter((item) => item.Codigo === 3)
            console.log(registrosdetalle)
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
            
            {/* <table className="bg-slate-50 min-w-full border-b px-4 py-2 rounded-lg border-collapse"> */}
            <table className="custom-table">
            <thead>
            <tr>
                <th className="border-b py-2 TitulosTamanho">Descripcion</th>
                <th className="border-b py-2 TitulosTamanho">Tipo</th>
                <th className="border-b py-2 TitulosTamanho">Ingreso</th>
                <th className="border-b py-2 TitulosTamanho">Egreso</th>
                <th className="border-b py-2"> </th>
            </tr>
            </thead>
            <tbody>
            {detalle && detalle.map((item, index) => (
                <tr key={index}>
                <td className="border-b px-2 py-2">{item.Descripcion}</td>
                <td className="border-b px-2 py-2">{item.Tipo}</td>
                <td className="border-b px-2 py-2">GS. {Number(item.MontoIngreso).toLocaleString('es-ES')}</td>
                <td className="border-b px-2 py-2">GS. {Number(item.MontoEgreso).toLocaleString('es-ES')}</td>

                
                </tr>
            ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2">Totales:</td>
                    <td> GS. {Number(totalingreso).toLocaleString('es-ES')}</td>
                    <td>GS. {Number(totalegreso).toLocaleString('es-ES')}</td>
                </tr>
            </tfoot>
            </table>


            <Form>
            <Row className="align-items-center">
                
                
                <Col xs="auto">
                <InputGroup className="mb-2">
                    <InputGroup.Text >SALDO</InputGroup.Text>
                    <Form.Control id="inlineFormInputGroup" placeholder="Username" 
                    value={`Gs. ${Number(saldo).toLocaleString('es-ES')}`}
                    disabled
                    />
                </InputGroup>
                </Col>
                
                
            </Row>
            </Form>






        </div>
    )


}
export default Resumen
