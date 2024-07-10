// ListarGastos.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Gasto from './Gasto';
import { obtenerGastos, eliminarGasto } from '../../services/gastos.services';

const ListarGastos = () => {
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    cargarGastos();
  }, []);

  const cargarGastos = async () => {
    try {
      const gastosData = await obtenerGastos();
      setGastos(gastosData);
    } catch (error) {
      console.error('Error al cargar los gastos:', error);
    }
  };

  const handleEliminarGasto = async (id) => {
    try {
      await eliminarGasto(id);
      setGastos(gastos.filter(gasto => gasto.id !== id));
    } catch (error) {
      console.error(`Error al eliminar el gasto con ID ${id}:`, error);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Listado de Gastos</h5>
        <ul className="list-group">
          {gastos.map((gasto) => (
            <Gasto key={gasto.id} gasto={gasto} onDelete={handleEliminarGasto} />
          ))}
        </ul>
        <div className="mt-3 d-flex justify-content-start">
          <Link to="/inicio" className="btn btn-outline-primary me-2">
            <i className="fa fa-home me-1"></i> Volver a Inicio
          </Link>
          <Link to="/registro" className="btn btn-outline-success">
            <i className="fa fa-plus me-1"></i> Registrar Nuevo Gasto
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListarGastos;
