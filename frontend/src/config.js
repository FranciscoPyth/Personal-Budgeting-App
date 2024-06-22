/*
En este archivo se definen las URL de los servicios REST que se van a consumir. Para
estandarizar un poco más el proceso y no tener que modificar cada archivo que consuma una URL
*/

const urlServidor = "http://localhost:4000"


const urlGastos = urlServidor + "/api/gastos";
const urlDivisas = urlServidor + "/api/divisas";
const urlCategorias = urlServidor + "/api/categorias";
const urlMediosDePago = urlServidor + "/api/mediosPago";
const urlTipoTransacciones = urlServidor + "/api/tiposTransaccion";


export const config = {
    urlServidor,
    urlGastos,
    urlDivisas,
    urlCategorias,
    urlMediosDePago,
    urlTipoTransacciones
}