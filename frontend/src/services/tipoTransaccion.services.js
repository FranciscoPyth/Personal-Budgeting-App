// src/services/apiService.js
import axios from 'axios';
import { config } from '../config';

const API_URL_TIPO_TRANSACCION = config.urlTipoTransacciones;

// Función para registrar una categoria
export const registrarTipoTransaccion = async (obra) => {
  try {
    const response = await axios.post(API_URL_TIPO_TRANSACCION, obra);
    return response.data;
  } catch (error) {
    console.error('Error en registrarObra:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Función para obtener la lista de categorias
export const obtenerTipoTransaccion = async () => {
  try {
    const response = await axios.get(API_URL_TIPO_TRANSACCION);
    return response.data;
  } catch (error) {
    throw error;
  }
};

