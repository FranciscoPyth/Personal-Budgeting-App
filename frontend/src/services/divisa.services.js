// src/services/apiService.js
import axios from 'axios';
import { config } from '../config';

const API_URL_DIVISAS = config.urlDivisas;

// Función para registrar una categoria
export const registrarDivisa = async (obra) => {
  try {
    const response = await axios.post(API_URL_DIVISAS, obra);
    return response.data;
  } catch (error) {
    console.error('Error en registrarObra:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Función para obtener la lista de categorias
export const obtenerDivisa = async () => {
  try {
    const response = await axios.get(API_URL_DIVISAS);
    return response.data;
  } catch (error) {
    throw error;
  }
};

