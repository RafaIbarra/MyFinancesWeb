import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Generarpeticion from '../../peticiones/apipeticiones';
function Home (){

    const[mes,Setmes]=useState(2)
    const[anno,Setanno]=useState(2024)
    const[datos,steDatos]=useState(null)
    const mostrardatos=(evente)=>{
        console.log(datos)
    }
    useEffect(() => {
        

        const cargardatos = async () => {
          const body = {};
          const endpoint='Balance/' + anno +'/' + mes + '/'
          const result = await Generarpeticion(endpoint, 'POST', body);
          
          const respuesta=result['resp']
          if (respuesta === 200) {
            
            steDatos(result['data'])
          } else {
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            // navigate('/');
          }
        };
    
        cargardatos();
      }, []);
    return(
        <div>
            DATOS DEL HOME
            <Button variant="primary" size="lg" onClick={mostrardatos}>Mostrar datos</Button>
        </div>
    )

}

export default Home