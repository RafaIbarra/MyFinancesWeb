import React, {useEffect, useState} from 'react';
 
import { CheckOutlined  } from '@ant-design/icons';
import './saldosperiodos.css'
function SaldosPeriodos({datosperiodosaldos}){
    const [imagensaldoperiodo, setImagensaldoperiodo] = useState(null);
    const [mayorsaldomes,setMayorsaldomes]=useState('')
    const [mayorssaldoingreso,setmayorssaldoingreso]=useState('')
    const [mayorsaldoegreso,setMayorsaldoegreso]=useState('')
    const [mayorsaldoporcentajesaldo,setMayorsaldoporcentajesaldo]=useState('')
    const [mayorsaldoporcentajeegreso,setMayorsaldoporcentajeegreso]=useState('')

    useEffect(() => {
        
        const cargardatos =  () => {
            
            
            console.log(datosperiodosaldos)
            // console.log(datosperiodosaldos[2])
        
            setImagensaldoperiodo(datosperiodosaldos[2].grafico)

            setMayorsaldomes(datosperiodosaldos[0]['MayorSaldo'][0].MesOperacion)
            setmayorssaldoingreso(datosperiodosaldos[0]['MayorSaldo'][0].MontoIngreso)
            setMayorsaldoegreso(datosperiodosaldos[0]['MayorSaldo'][0].MontoEgreso)
            setMayorsaldoporcentajesaldo(datosperiodosaldos[0]['MayorSaldo'][0].PorcentajeSaldo)
            setMayorsaldoporcentajeegreso(datosperiodosaldos[0]['MayorSaldo'][0].PorcentajeEgreso)
               

  
            
          };
          
    
        cargardatos();
      }, []);

    return(
        <div className='contenedor-flex-estadistica-saldos'>

            <div className='contenedor-estadistica-saldos-texto'>
                <div className="contenedor-lista">
                    <h6 className='titulodatos'>Datos del mes con mayor Saldo en montos:</h6>
                    <p className="item"> <CheckOutlined></CheckOutlined> Mes: <strong><em>{`  ${(mayorsaldomes)}`}. </em></strong> </p>
                    <p className="item"> <CheckOutlined></CheckOutlined> Monto Ingreso: <strong><em>{` Gs. ${Number(mayorssaldoingreso).toLocaleString('es-ES')}`}. </em></strong> </p>
                    <p className="item"> <CheckOutlined></CheckOutlined> Monto Egreso: <strong><em>{` Gs. ${Number(mayorsaldoegreso).toLocaleString('es-ES')}`}. </em></strong> </p>
                    <p className="item"> <CheckOutlined></CheckOutlined> Monto Saldo:  </p>
                    <p className="item"> <CheckOutlined></CheckOutlined> Porcentaje del saldo sobre el ingreso: <strong><em>{`  ${(mayorsaldoporcentajesaldo)}% `}. </em></strong></p>
                    <p className="item"> <CheckOutlined></CheckOutlined> Porcentaje del egreso sobre el ingreso: <strong><em>{`  ${(mayorsaldoporcentajeegreso)}%`}. </em></strong></p>
                
                </div>
            </div>
            <div className='contenedor-imagen-saldos'>

                <img 
                    src={`data:image/png;base64,${imagensaldoperiodo}`}
                    alt="Descripción de la imagen"
                    className='imagen-saldos'
                />
            </div>
        </div>
    )

}
export default SaldosPeriodos