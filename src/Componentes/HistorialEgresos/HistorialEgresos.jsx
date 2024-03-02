import React, {useEffect, useState } from 'react';
import {  Table, Typography,Divider,InputNumber,Input,Select,Radio,Button,Tooltip  } from 'antd';
import { AudioOutlined,SearchOutlined,RetweetOutlined  } from '@ant-design/icons';
import FormItem from 'antd/es/form/FormItem';
import { Navigate, useNavigate } from "react-router-dom";
import Generarpeticion from '../../peticiones/apipeticiones';

import './historialegresos.css'
const { Text } = Typography;
const { Search } = Input;

function HistorialEgresos(){
    const navigate=useNavigate()
    const [dataingresosoriginal,setDataingresosoriginal]=useState([])
    const [dataingresos,setDataingresos]=useState([])
    const [dataagrupacion,setDataagrupacion]=useState([])
    
    const [customSize,setCustomSize]=useState('10')
    const [cantidadresultado,setCantidadresultado]=useState(0)
    const [montoresultado,setMontoresultado]=useState(0)
    const [busquedaactiva,setBusquedaactiva]=useState(false)
    const [annos,setAnnos]=useState([])
    const [meses,setMeses]=useState([])

    const [textobusqueda,setTextobusqueda]=useState('')
    const [messel,setMessel]=useState(0)
    const [annosel,setAnnosel]=useState(0)
    
    const [categoriasel,setCategoriasel]=useState("0")
    
    const [textop,setTextop]=useState('')
    const columns=[
      
        { title: 'Descripcion',
          dataIndex: 'NombreGasto',
          key: 'DetalleEgreso_Descripcion',
          sorter: (a, b) => a.NombreGasto.localeCompare(b.NombreGasto),
        },
        { title: 'Tipo',
          dataIndex: 'TipoGasto',
          key: 'DetalleEgreso_Tipo',
          filters: [
            {
              text: 'Ocasionales',
              value: 'Ocasionales',
            },
            {
              text: 'Fijo',
              value: 'Fijo',
            },
            
          ],
          onFilter: (value, record) => record.TipoGasto.indexOf(value) === 0,
        },
  
        { title: 'Categoria',
          dataIndex: 'CategoriaGasto', 
          key: 'DetalleEgreso_Categoria',
        //   filters: categoriasagrupadas.map(categoria => ({
        //     text: categoria,
        //     value: categoria,
        //   })),
  
        //   onFilter: (value, record) => record.CategoriaGasto.indexOf(value) === 0,
        //   sorter: (a, b) => a.CategoriaGasto.localeCompare(b.CategoriaGasto),
  
        },
  
        { title: 'Egreso',
          dataIndex: 'monto_gasto',
          key: 'DetalleEgreso_Egreso',
          render: (monto_gasto) => (
            <span>
              Gs. {Number(monto_gasto).toLocaleString('es-ES')}
            </span>
          ),
        },
        { title: 'Fecha Gasto',dataIndex: 'fecha_gasto',key: 'DetalleEgreso_FechaGasto'},
        { title: 'Fecha Registro',
          dataIndex: 'fecha_registro',
          key: 'DetalleEgreso_FechaRegistro',
          width: 250,
          sorter: (a, b) => new Date(a.fecha_registro) - new Date(b.fecha_registro),
        },
        
      ]
      

}
export default HistorialEgresos