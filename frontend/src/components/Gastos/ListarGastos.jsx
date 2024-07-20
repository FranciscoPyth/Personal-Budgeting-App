// src/components/ListarGastos.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
      setGastos(gastos.filter((gasto) => gasto.id !== id));
    } catch (error) {
      console.error(`Error al eliminar el gasto con ID ${id}:`, error);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Listado de Gastos</h5>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Monto</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {gastos.map((gasto) => (
                <tr key={gasto.id}>
                  <td>{gasto.descripcion}</td>
                  <td>{gasto.monto}</td>
                  <td>{gasto.fecha}</td>
                  <td className="align-middle">
                    <div className="d-flex align-items-center">
                      <Link
                        to={`/gastos/${gasto.id}`}
                        className="btn btn-sm btn-outline-primary me-2"
                        title="Consultar"
                      >
                        <i className="fa fa-eye"></i>
                      </Link>
                      <Link
                        to={`/editar-gasto/${gasto.id}`}
                        className="btn btn-sm btn-outline-primary me-2"
                        title="Modificar"
                      >
                        <i className="fa fa-edit"></i>
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        title="Eliminar"
                        onClick={() => handleEliminarGasto(gasto.id)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
