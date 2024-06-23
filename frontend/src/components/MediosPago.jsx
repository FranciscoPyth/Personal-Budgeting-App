import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { 
  obtenerMediosPago, 
  registrarMedioPago, 
  obtenerMedioPagoPorId, 
  actualizarMedioPago, 
  eliminarMedioPago
} from '../services/medioPago.services';
import { FaTrash, FaEdit } from 'react-icons/fa'; // Importamos los iconos de react-icons

const MedioPago = () => {
  const [mediosPago, setMediosPago] = useState([]);
  const [modo, setModo] = useState('listar'); // listar, editar, eliminar, nuevo
  const [medioPagoActual, setMedioPagoActual] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    cargarMediosPago();
  }, []);

  const cargarMediosPago = async () => {
    try {
      const data = await obtenerMediosPago();
      console.log('Medios de Pago:', data);
      setMediosPago(data);
    } catch (error) {
      console.error('Error al obtener medios de pago:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (modo === 'nuevo') {
        console.log('Registrar medio de pago:', data);
        await registrarMedioPago(data);
      } else if (modo === 'editar') {
        console.log('Actualizar medio de pago:', data);
        console.log('Medio de pago actual:', medioPagoActual);
        console.log('idMedioPago:', medioPagoActual.idMedioPago);
        await actualizarMedioPago(medioPagoActual.idMedioPago, data);
      }
      reset();
      setModo('listar');
      cargarMediosPago();
    } catch (error) {
      console.error('Error al registrar/actualizar medio de pago:', error);
    }
  };

  const handleEditar = async (idMedioPago) => {
    try {
      const medioPago = await obtenerMedioPagoPorId(idMedioPago);
      setMedioPagoActual(medioPago);
      reset(medioPago);
      setModo('editar');
    } catch (error) {
      console.error('Error al obtener el medio de pago:', error);
    }
  };

  const handleEliminar = async (idMedioPago) => {
    try {
      console.log('Eliminar medio de pago con idMedioPago:', idMedioPago);
      await eliminarMedioPago(idMedioPago);
      cargarMediosPago();
    } catch (error) {
      console.error('Error al eliminar medio de pago:', error);
    }
  };

  const handleCancelar = () => {
    reset();
    setModo('listar');
  };

  if (modo === 'listar') {
    return (
      <div className="container mt-5">
        <h2 className="mb-4">Medios de Pago</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mediosPago.map(medioPago => (
              <tr key={medioPago.idMedioPago}>
                <td>{medioPago.idMedioPago}</td>
                <td>{medioPago.descripcion}</td>
                <td>
                  <button onClick={() => handleEditar(medioPago.idMedioPago)} className="btn btn-light me-2">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleEliminar(medioPago.idMedioPago)} className="btn btn-light text-danger">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => setModo('nuevo')} className="btn btn-primary mt-3">Registrar Medio de Pago</button>
        <button type="button" className="btn btn-secondary mt-3 ms-2" onClick={() => navigate('/registro')}>Volver</button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{modo === 'nuevo' ? 'Registrar Nuevo Medio de Pago' : 'Editar Medio de Pago'}</h2>
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

export default MedioPago;
