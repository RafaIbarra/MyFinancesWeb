import React from "react";
import Handelstorage from "../Storage/handelstorage";
const ComprobarStorage=()=>{

    const datosstarage = Handelstorage('obtener');
    const tokenstorage = datosstarage['token'];

    if (tokenstorage) {
        return true
    } else {
        return false
    }
      
}

export default ComprobarStorage