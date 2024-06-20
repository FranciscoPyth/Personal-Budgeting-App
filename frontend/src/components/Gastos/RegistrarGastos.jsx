import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const RegistrarGastos = ({ agregarGasto }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Lógica para agregar el gasto (simulado)
    console.log(data); // Solo para demostración
    navigate('/lista'); // Navega a la lista de gastos después de registrar uno
  };

  const categorias = ['Comida', 'Transporte', 'Entretenimiento']; // Ejemplo de opciones para categorías
  const mediosDePago = ['Efectivo', 'Tarjeta de Crédito', 'Transferencia']; // Ejemplo de opciones para medios de pago
  const divisas = ['USD', 'EUR', 'ARS']; // Ejemplo de opciones para divisas
  const tipoTransacciones = ['Ingreso', 'Egreso']; // Ejemplo de opciones para tipo de transacción

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
          <select className="form-select" id="categoria" {...register('categoria', { required: true })}>
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>{categoria}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="medioPago" className="form-label">Medio de Pago</label>
          <select className="form-select" id="medioPago" {...register('medioPago', { required: true })}>
            <option value="">Selecciona un medio de pago</option>
            {mediosDePago.map((medio) => (
              <option key={medio} value={medio}>{medio}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="divisa" className="form-label">Divisa</label>
          <select className="form-select" id="divisa" {...register('divisa', { required: true })}>
            <option value="">Selecciona una divisa</option>
            {divisas.map((divisa) => (
              <option key={divisa} value={divisa}>{divisa}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="tipoTransaccion" className="form-label">Tipo Transacción</label>
          <select className="form-select" id="tipoTransaccion" {...register('tipoTransaccion', { required: true })}>
            <option value="">Selecciona un Tipo de Transacción</option>
            {tipoTransacciones.map((tipoTransaccion) => (
              <option key={tipoTransaccion} value={tipoTransaccion}>{tipoTransaccion}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary me-2">Registrar Gasto</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/lista')}>Cancelar</button>
      </form>
    </div>
  );
};

export default RegistrarGastos;
