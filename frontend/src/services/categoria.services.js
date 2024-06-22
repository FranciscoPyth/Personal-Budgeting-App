// src/services/apiService.js
import axios from 'axios';
import { config } from '../config';

const API_URL_CATEGORIAS = config.urlCategorias;

// Función para registrar una categoria
export const registrarCategoria = async (obra) => {
  try {
    const response = await axios.post(API_URL_CATEGORIAS, obra);
    return response.data;
  } catch (error) {
    console.error('Error en registrarObra:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Función para obtener la lista de categorias
export const obtenerCategorias = async () => {
  try {
    const response = await axios.get(API_URL_CATEGORIAS);
    return response.data;
  } catch (error) {
    throw error;
  }
};

