import APIBASE from './baseurls'
async function Iniciarsesion(usuario,password){
    // const APIBASE='http://127.0.0.1:8000/api'
    let data={}
    let resp=0
    let datos={}
    const endpoint='login/'
    const requestOptions = {
        method: 'POST',
        headers: {  'Content-Type': 'application/json',
                    
                },
        body: JSON.stringify({
                    username: usuario,
                    password: password,
                  }),
        }

    const response = await fetch(`${APIBASE}/${endpoint}`, requestOptions);  
        data= await response.json();
        resp= response.status;
        console.log(response)
        datos={data,resp}
        return datos

} 
export default Iniciarsesion