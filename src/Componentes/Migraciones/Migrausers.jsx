import React, {useEffect, useState} from 'react';
import Generarpeticion from '../../peticiones/apipeticiones';
import { Navigate, useNavigate } from "react-router-dom";

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Button } from 'antd';

function Migrausers(){
    const navigate=useNavigate()
    const [datosmigrar,setDatosmigrar]=useState([])
    const [cabecera,setCabecera]=useState([])
    const [selectedOption, setSelectedOption] = useState('');
    const options = [
        { value: 'MigracionUsers', label: 'Datos Users' },
        { value: 'migracioncategoriagastos', label: 'Categoria Gastos' },
        { value: 'migracionegresos', label: 'Egresos' },
        { value: 'migracionegresosdistribucion', label: 'Egresos Distribucion' },
        { value: 'migracionentidadesbeneficiones', label: 'Entidades Beneficios' },
        { value: 'migraciongastos', label: 'Gastos' },
        { value: 'migracioningresos', label: 'Ingresos' },
        { value: 'migracionmediopago', label: 'Medio Pago' },
        { value: 'migracionmeses', label: 'Meses' },
        { value: 'migracionmovimientosbeneficios', label: 'Movimientos Beneficios' },
        { value: 'migracionproductosfinancieros', label: 'Productos Financieros' },
        { value: 'migraciontiposgastos', label: 'Tipos Gastos' },
        { value: 'migraciontiposproductosfinancieros', label: 'Tipos Productos Financieros' },
        { value: 'migracionusuarios', label: 'Usuarios' },


        
      ];
      const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
       
      };

    const cargardatosselccionado =async()=>{
        const body = {};
            const endpoint=selectedOption + '/'
            const result = await Generarpeticion(endpoint, 'POST', body);
            
            const respuesta=result['resp']
            
            if (respuesta === 200) {
                const registros=result['data']
                
               
               setDatosmigrar(registros)
               const headers = registros.length > 0 ? Object.keys(registros[0]) : [];
               setCabecera(headers)
                
            } else if(respuesta === 403 || respuesta === 401){
                
                navigate('/Closesesion')

            }
    }

    const downloadExcel = () => {
        // Crear un nuevo libro de trabajo (workbook) y una hoja de trabajo (worksheet)
        const worksheet = XLSX.utils.json_to_sheet(datosmigrar);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    
        // Convertir el libro de trabajo a un archivo de Excel
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        
        // Guardar el archivo usando file-saver
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        const fileName = `${selectedOption}.xlsx`;
        saveAs(blob, fileName);
      };
    const downloadCSV = () => {
        // Crear una hoja de trabajo a partir de los datos
        const worksheet = XLSX.utils.json_to_sheet(datosmigrar);
    
        // Convertir la hoja de trabajo a CSV
        const csv = XLSX.utils.sheet_to_csv(worksheet);
    
        // Crear un archivo Blob de tipo 'text/csv'
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const fileName = `${selectedOption}.csv`;
        // Guardar el archivo usando file-saver
        saveAs(blob, fileName);
      };
    const ambos =()=>{
        downloadCSV()
        downloadExcel()
    }

    if (datosmigrar){

        return(
            <div style={{marginLeft:'25px'}}>
                <div style={{marginBottom:'50px',marginTop:'10px'}}>

                    <select id="combo-box" value={selectedOption} onChange={handleSelectChange}>
                        <option value="" disabled>
                        --Seleccione--
                        </option>
                        {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                        ))}
                    </select>

                    <button style={{marginLeft:'10px'}} onClick={cargardatosselccionado}>
                        Cargar datos
                    </button>
                </div>



                <button onClick={downloadExcel}>
                    Descargar en Excel
                </button>

                <button style={{marginLeft:'50px'}} onClick={downloadCSV}>
                    Descargar en CSV
                </button>

                <button style={{marginLeft:'50px'}} onClick={ambos}>
                    Ambos Formatos
                </button>

                <table>
                    <thead>
                        <tr>
                        {cabecera.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                        {datosmigrar.map((item, rowIndex) => (
                        <tr key={rowIndex}>
                            {cabecera.map((header, colIndex) => (
                            <td key={colIndex}>{item[header]}</td>
                            ))}
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )

    }

}

export default Migrausers