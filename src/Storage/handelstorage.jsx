const Handelstorage=(opcion,data)=>{

    const agregar=()=>{
        localStorage.setItem('userData', JSON.stringify(data))

        const fechaActual = new Date();
        const mesactual = parseInt(fechaActual.getMonth() + 1);
        const añoActual = parseInt(fechaActual.getFullYear());
        const datadate={
          datames:mesactual,
          dataanno:añoActual
        }
        console.log(datadate)
        localStorage.setItem('userdate', JSON.stringify(datadate))

    }
    const obtener=()=>{
        
        const userLocalStorageData = JSON.parse(localStorage.getItem('userData'));
        if (userLocalStorageData !== null){
          return {
            token: userLocalStorageData.token,
            refreshToken: userLocalStorageData.refreshToken,
            sesion: userLocalStorageData.sesion,
            
          };
        }else{
          return {
            token: false,
            refreshToken: false,
            sesion: false,
            
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


    
    if (opcion === 'agregar') {
        agregar();
      }
    else if(opcion === 'obtener') {
        let resultado=obtener()
        return resultado
      }
    else if(opcion === 'obtenerdate') {
        let resultado=obtenerdate()
        return resultado
      }
}
export default Handelstorage