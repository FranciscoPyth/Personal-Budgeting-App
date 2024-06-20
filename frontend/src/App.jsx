// src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Menu } from './components/Menu';
import { Inicio } from './components/Inicio';
import RegistrarGastos from './components/Gastos/RegistrarGastos'; // Importa el componente correctamente
import ListarGastos from './components/Gastos/ListarGastos'; // Importa el componente correctamente
import gastos from './mockData/gastos'; // Importa los datos simulados

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <div className="divBody">
        <Routes>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/registro" element={<RegistrarGastos />} />
          <Route
            path="/lista"
            element={<ListarGastos gastos={gastos} />} 
          />
          <Route path="*" element={<Navigate to="/inicio" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
