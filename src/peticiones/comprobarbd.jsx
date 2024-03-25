import APIBASE from './baseurls'
async function ComprobarConexion(){
    
    let data={}
    let resp=0
    let datos={}
    const endpoint='ComprobarConexion/'
    const requestOptions = {
        method: 'GET',
        headers: {  'Content-Type': 'application/json',
                    
                },
        
        }

    // const response = await fetch(`${APIBASE}/${endpoint}`, requestOptions); 
    
    let error_bd=true;

    await fetch(`${APIBASE}/${endpoint}`)
    .then(response => {
        
        if (!response.ok) {
        
        
            error_bd=false
        
        }
        
    })
    .catch(err => {
        
        error_bd=false
    });

   return error_bd

} 
export default ComprobarConexion