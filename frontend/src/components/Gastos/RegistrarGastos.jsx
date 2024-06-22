import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { categoriaService } from '../../services/categoria.services';
import { medioPagoService } from '../../services/medioPago.services';
import { divisaService } from '../../services/divisa.services';
import tipoTransaccionService from '../../services/tipoTransaccion.services';

const RegistrarGastos = ({ agregarGasto }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState([]);
  const [mediosDePago, setMediosDePago] = useState([]);
  const [divisas, setDivisas] = useState([]);
  const [tipoTransacciones, setTipoTransacciones] = useState([]);

  useEffect(() => {
    // Cargar categorías
    categoriaService.obtenerCategorias().then((data) => setCategorias(data));

    // Cargar medios de pago
    medioPagoService.obtenerMedioPago().then((data) => setMediosDePago(data));

    // Cargar divisas
    divisaService.obtenerDivisa().then((data) => setDivisas(data));

    // Cargar tipo de transacciones
    tipoTransaccionService.obtenerTipoTransaccion().then((data) => setTipoTransacciones(data));
  }, []);

  const onSubmit = (data) => {
    // Lógica para agregar el gasto (simulado)
    console.log(data); // Solo para demostración
    navigate('/lista'); // Navega a la lista de gastos después de registrar uno
  };

  return (
    <div className="container mt-5">
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
                <option key={categoria.id} value={categoria.nombre}>{categoria.nombre}</option>
              ))}
            </select>
            <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/nueva-categoria')}>+</button>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="medioPago" className="form-label">Medio de Pago</label>
          <div className="d-flex">
            <select className="form-select me-2" id="medioPago" {...register('medioPago', { required: true })}>
              <option value="">Selecciona un medio de pago</option>
              {mediosDePago.map((medio) => (
                <option key={medio.id} value={medio.nombre}>{medio.nombre}</option>
              ))}
            </select>
            <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/nuevo-medio-pago')}>+</button>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="divisa" className="form-label">Divisa</label>
          <div className="d-flex">
            <select className="form-select me-2" id="divisa" {...register('divisa', { required: true })}>
              <option value="">Selecciona una divisa</option>
              {divisas.map((divisa) => (
                <option key={divisa.id} value={divisa.nombre}>{divisa.nombre}</option>
              ))}
            </select>
            <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/nueva-divisa')}>+</button>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="tipoTransaccion" className="form-label">Tipo Transacción</label>
          <div className="d-flex">
            <select className="form-select me-2" id="tipoTransaccion" {...register('tipoTransaccion', { required: true })}>
              <option value="">Selecciona un Tipo de Transacción</option>
              {tipoTransacciones.map((tipoTransaccion) => (
                <option key={tipoTransaccion.id} value={tipoTransaccion.nombre}>{tipoTransaccion.nombre}</option>
              ))}
            </select>
            <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/nuevo-tipo-transaccion')}>+</button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary me-2">Registrar Gasto</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/lista')}>Cancelar</button>
      </form>
    </div>
  );
};

export default RegistrarGastos;
