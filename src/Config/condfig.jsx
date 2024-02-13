export const FormatoFecha = (date) => {
    console.log(date)
    // const year = date.getFullYear();
    const year = '2024'
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
