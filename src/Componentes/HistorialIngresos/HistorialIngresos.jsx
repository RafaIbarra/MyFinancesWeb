import React, {useEffect, useState} from 'react';
import Generarpeticion from '../../peticiones/apipeticiones';
function HistorialIngresos(){
    const [dataingresos,setDataingresos]=useState([])

    useEffect(() => {
        
        const cargardatos = async () => {
        
            const body = {};
            const endpoint='MisIngresos/0/0/'
            const result = await Generarpeticion(endpoint, 'POST', body);
            
            const respuesta=result['resp']
            
            if (respuesta === 200) {
                const registros=result['data']
                console.log(registros)
                if(Object.keys(registros).length>0){
                    registros.forEach((elemento) => {
                      
                      elemento.key = elemento.id;
                    })
        
                    setDataingresos(registros)
                    
                    
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

}
export default HistorialIngresos