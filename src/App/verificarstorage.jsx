import React from "react";
import Handelstorage from "../Storage/handelstorage";
const ComprobarStorage=()=>{

    const datosstarage = Handelstorage('obtener');
    const tokenstorage = datosstarage['token'];

    if (tokenstorage) {
        // return true
        console.log('el user name :')
        datosstarage['user_name']
        return {
            datosesion:true,

            user_name:datosstarage['user_name']
        }
    } else {
        return {
            datosesion:false,
            user_name:''
        }
    }
      
}

export default ComprobarStorage