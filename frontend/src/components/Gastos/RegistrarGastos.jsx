import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { registrarGasto } from '../../services/gastos.services'; // Importa la función de servicio para registrar gasto
import { obtenerCategorias } from '../../services/categoria.services';
import { obtenerMediosPago } from '../../services/medioPago.services';
import { obtenerDivisa } from '../../services/divisa.services';
import { obtenerTipoTransaccion } from '../../services/tipoTransaccion.services';

const RegistrarGastos = ({ agregarGasto }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState([]);
  const [mediosDePago, setMediosDePago] = useState([]);
  const [divisas, setDivisas] = useState([]);
  const [tipoTransacciones, setTipoTransacciones] = useState([]);

  useEffect(() => {
    // Cargar categorías
    obtenerCategorias().then((data) => setCategorias(data));

    // Cargar medios de pago
    obtenerMediosPago().then((data) => setMediosDePago(data));

    // Cargar divisas
    obtenerDivisa().then((data) => setDivisas(data));

    // Cargar tipo de transacciones
    obtenerTipoTransaccion().then((data) => setTipoTransacciones(data));
  }, []);

  const onSubmit = async (data) => {
    try {
      // Llama al servicio para registrar el gasto
      await registrarGasto(data);
      console.log('Gasto registrado:', data); // Solo para demostración
      navigate('/lista'); // Navega a la lista de gastos después de registrar uno
    } catch (error) {
      console.error('Error al registrar el gasto:', error);
    }
  };

  return (
    <div className="container mt-5 mb-5"> {/* Añadido mb-5 para dar margen inferior */}
      <h2 className="mb-4">Registrar Nuevo Gasto</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="monto" className="form-label">Monto</label>
          <input type="number" step="0.01" className="form-control" id="monto" {...register('monto', { required: true })} />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <input type="text" className="form-control" id="descripcion" {...register('descripcion', { required: true })} />
        </div>
        <div className="mb-3">
          <label htmlFor="fecha" className="form-label">Fecha de la transacción</label>
          <input type="date" className="form-control" id="fecha" {...register('fecha', { required: true })} />
        </div>
        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">Categoría</label>
          <div className="d-flex">
            <select className="form-select me-2" id="categoria" {...register('categoria', { required: true })}>
              <option value="">Selecciona una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.descripcion}>{categoria.descripcion}</option>
              ))}
            </select>
            <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/categorias')}>+</button>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="medioPago" className="form-label">Medio de Pago</label>
          <div className="d-flex">
            <select className="form-select me-2" id="medioPago" {...register('medioPago', { required: true })}>
              <option value="">Selecciona un medio de pago</option>
              {mediosDePago.map((medio) => (
                <option key={medio.id} value={medio.descripcion}>{medio.descripcion}</option>
              ))}
            </select>
            <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/medio-pago')}>+</button>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="divisa" className="form-label">Divisa</label>
          <div className="d-flex">
            <select className="form-select me-2" id="divisa" {...register('divisa', { required: true })}>
              <option value="">Selecciona una divisa</option>
              {divisas.map((divisa) => (
                <option key={divisa.id} value={divisa.descripcion}>{divisa.descripcion}</option>
              ))}
            </select>
            <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/divisas')}>+</button>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="tipoTransaccion" className="form-label">Tipo Transacción</label>
          <div className="d-flex">
            <select className="form-select me-2" id="tipoTransaccion" {...register('tipoTransaccion', { required: true })}>
              <option value="">Selecciona un Tipo de Transacción</option>
              {tipoTransacciones.map((tipoTransaccion) => (
                <option key={tipoTransaccion.id} value={tipoTransaccion.descripcion}>{tipoTransaccion.descripcion}</option>
              ))}
            </select>
            <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/tipo-transaccion')}>+</button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary me-2">Registrar Gasto</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/lista')}>Cancelar</button>
      </form>
    </div>
  );
};

export default RegistrarGastos;