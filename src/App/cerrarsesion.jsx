import React, {useEffect, useState} from 'react';

import Handelstorage from '../Storage/handelstorage';

const CerrarSesion=()=>{
    
    Handelstorage('borrar')
    
}

export default CerrarSesion