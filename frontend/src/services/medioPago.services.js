// src/services/apiService.js
import axios from 'axios';
import { config } from '../config';

const API_URL_MEDIOS_PAGO = config.urlMediosDePago;

// Función para registrar una categoria
export const registrarMedioPago = async (obra) => {
  try {
    const response = await axios.post(API_URL_MEDIOS_PAGO, obra);
    return response.data;
  } catch (error) {
    console.error('Error en registrarObra:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Función para obtener la lista de categorias
export const obtenerMedioPago = async () => {
  try {
    const response = await axios.get(API_URL_MEDIOS_PAGO);
    return response.data;
  } catch (error) {
    throw error;
  }
};

