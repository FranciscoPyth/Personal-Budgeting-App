import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Menu } from './components/Menu';
import { Inicio } from './components/Inicio';
import RegistrarGastos from './components/Gastos/RegistrarGastos';
import ListarGastos from './components/Gastos/ListarGastos';
import gastos from './mockData/gastos';
import Categorias from './components/Categorias';
import MedioPago from './components/MetodoPago';
import TipoTransaccion from './components/TiposTransacciones';
import Divisa from './components/Divisas';

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <div className="divBody">
        <Routes>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/registro" element={<RegistrarGastos />} />
          <Route path="/lista" element={<ListarGastos gastos={gastos} />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path='/medio-pago' element={<MedioPago/>}></Route>
          <Route path='/tipo-transaccion' element={<TipoTransaccion/>}></Route>
          <Route path='/divisas' element={<Divisa/>}></Route>
          <Route path="*" element={<Navigate to="/inicio" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
