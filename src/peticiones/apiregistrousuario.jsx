// import APIBASE from './baseurls'
import { APIBASE } from '../../config';
async function ApiRegistroUsuario(datausuario){
    
    
    let data={}
    let resp=0
    let datos={}
    const endpoint='Registro/'
    
    const requestOptions = {
        method: 'POST',
        headers: {  'Content-Type': 'application/json',
                    
                },
        body: JSON.stringify({
            nombre:datausuario['nombre'],
            apellido:datausuario['apellido'],
            nacimiento:datausuario['nacimiento'],
            user:datausuario['user'],
            correo:datausuario['correo'],
            password:datausuario['password'],
          }),
        }

    const response = await fetch(`${APIBASE}/${endpoint}`, requestOptions);  
        data= await response.json();
        resp= response.status;
        
        datos={data,resp}
        return datos

} 
export default ApiRegistroUsuario