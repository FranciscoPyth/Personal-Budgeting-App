// Gasto.js

import React from 'react';

const Gasto = ({ gasto, onDelete }) => {
  const handleEliminarClick = () => {
    onDelete(gasto.idGasto); // Llama a la función onDelete pasando el ID del gasto
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <strong>ID: {gasto.idGasto}</strong> - {gasto.descripcion}
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
