import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { 
  obtenerDivisa, 
  registrarDivisa, 
  obtenerDivisaPorId, 
  actualizarDivisa, 
  eliminarDivisa
} from '../services/divisa.services';
import { FaTrash, FaEdit } from 'react-icons/fa'; // Importamos los iconos de react-icons

const Divisa = () => {
  const [divisas, setDivisas] = useState([]);
  const [modo, setModo] = useState('listar'); // listar, editar, eliminar, nuevo
  const [divisaActual, setDivisaActual] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    cargarDivisas();
  }, []);

  const cargarDivisas = async () => {
    try {
      const data = await obtenerDivisa();
      console.log('Divisas:', data);
      setDivisas(data);
    } catch (error) {
      console.error('Error al obtener divisas:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (modo === 'nuevo') {
        console.log('Registrar divisa:', data);
        await registrarDivisa(data);
      } else if (modo === 'editar') {
        console.log('Actualizar divisa:', data);
        console.log('Divisa actual:', divisaActual);
        console.log('idDivisa:', divisaActual.idDivisa);
        await actualizarDivisa(divisaActual.idDivisa, data);
      }
      reset();
      setModo('listar');
      cargarDivisas();
    } catch (error) {
      console.error('Error al registrar/actualizar divisa:', error);
    }
  };

  const handleEditar = async (idDivisa) => {
    try {
      const divisa = await obtenerDivisaPorId(idDivisa);
      setDivisaActual(divisa);
      reset(divisa);
      setModo('editar');
    } catch (error) {
      console.error('Error al obtener la divisa:', error);
    }
  };

  const handleEliminar = async (idDivisa) => {
    try {
      console.log('Eliminar divisa con idDivisa:', idDivisa);
      await eliminarDivisa(idDivisa);
      cargarDivisas();
    } catch (error) {
      console.error('Error al eliminar divisa:', error);
    }
  };

  const handleCancelar = () => {
    reset();
    setModo('listar');
  };

  if (modo === 'listar') {
    return (
      <div className="container mt-5">
        <h2 className="mb-4">Divisas</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {divisas.map(divisa => (
              <tr key={divisa.idDivisa}>
                <td>{divisa.idDivisa}</td>
                <td>{divisa.descripcion}</td>
                <td>
                  <button onClick={() => handleEditar(divisa.idDivisa)} className="btn btn-light me-2">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleEliminar(divisa.idDivisa)} className="btn btn-light text-danger">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => setModo('nuevo')} className="btn btn-primary mt-3">Registrar Divisa</button>
        <button type="button" className="btn btn-secondary mt-3 ms-2" onClick={() => navigate('/registro')}>Volver</button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{modo === 'nuevo' ? 'Registrar Nueva Divisa' : 'Editar Divisa'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <input type="text" className="form-control" id="descripcion" {...register('descripcion', { required: true })} />
        </div>
        <div className="d-flex justify-content-start">
          <button type="submit" className="btn btn-primary me-2">{modo === 'nuevo' ? 'Registrar' : 'Actualizar'}</button>
          <button type="button" className="btn btn-secondary me-2" onClick={handleCancelar}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default Divisa;
