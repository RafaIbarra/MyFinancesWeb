const Handelstorage=(opcion,item,valor)=>{

    const agregar=(data)=>{
        localStorage.setItem('userData', JSON.stringify(data))

        const fechaActual = new Date();
        const mesactual = parseInt(fechaActual.getMonth() + 1);
        const añoActual = parseInt(fechaActual.getFullYear());
        const datadate={
          datames:mesactual,
          dataanno:añoActual
        }
        
        localStorage.setItem('userdate', JSON.stringify(datadate))

    }
    const obtener=()=>{
        
        const userLocalStorageData = JSON.parse(localStorage.getItem('userData'));
        if (userLocalStorageData !== null){
          return {
            token: userLocalStorageData.token,
            refreshToken: userLocalStorageData.refreshToken,
            sesion: userLocalStorageData.sesion,
            user_name: userLocalStorageData.user_name,
            
          };
        }else{
          return {
            token: false,
            refreshToken: false,
            sesion: false,
            user_name: false,
            
          };
        }
    }

    const obtenerdate=()=>{
        
      const userLocalStorageDate = JSON.parse(localStorage.getItem('userdate'));
      if (userLocalStorageDate !== null){
        return {
          datames: userLocalStorageDate.datames,
          dataanno: userLocalStorageDate.dataanno,
          
          
        };
      }else{
        return {
          datames: 0,
          dataanno: 0,
          
        };
      }
    }

    const borrar=()=>{
      
      localStorage.removeItem("userdate")
      localStorage.removeItem("userData")
    }

    const actualizardate =(item,valor)=>{
      const datosActuales = JSON.parse(localStorage.getItem('userdate'))
      datosActuales[item]=valor
      
      localStorage.setItem('userdate', JSON.stringify(datosActuales));
    }
    
    if (opcion === 'agregar') {
        agregar(item);
      }
    else if(opcion === 'obtener') {
        let resultado=obtener()
        return resultado
      }
    else if(opcion === 'obtenerdate') {
        let resultado=obtenerdate()
        return resultado
      }
    else if(opcion === 'actualizardate') {
          actualizardate(item,valor)
      }
    else if(opcion === 'borrar') {
      borrar()
    }
}
export default Handelstorage