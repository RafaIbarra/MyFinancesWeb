const Handelstorage=(opcion,data)=>{

    const agregar=()=>{
        localStorage.setItem('userData', JSON.stringify(data))

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
    if (opcion === 'agregar') {
        agregar();
      }
    else if(opcion === 'obtener') {
        let resultado=obtener()
        return resultado
      }
}
export default Handelstorage