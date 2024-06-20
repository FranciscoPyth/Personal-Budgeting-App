// src/components/Gastos/Gasto.jsx

import React from 'react';

const Gasto = ({ gasto }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <strong>{gasto.fecha}</strong> - {gasto.descripcion} ({gasto.moneda} {gasto.monto})
      </div>
      <span className="badge bg-secondary">{gasto.categoria}</span>
    </li>
  );
};

export default Gasto;
