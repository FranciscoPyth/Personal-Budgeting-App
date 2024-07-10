// Gasto.js

import React from 'react';

const Gasto = ({ gasto, onDelete }) => {
  const handleEliminarClick = () => {
    onDelete(gasto.id); // Llama a la función onDelete pasando el ID del gasto
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <strong>{gasto.id}</strong> | {gasto.descripcion} | ${gasto.monto} | {gasto.fecha}
      </div>
      <div>
        <button className="btn btn-danger" onClick={handleEliminarClick}>
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Gasto;
