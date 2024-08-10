import React, { useState } from 'react';
import { iniciarSesion } from '../services/login.services';
import { ToastContainer, toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await iniciarSesion({ username, password });

      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/inicio');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      toast.error('Ocurrió un error durante el inicio de sesión. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="login-container-unique">
      <form className="login-form-unique" onSubmit={handleLogin}>
        <h2>Budgeting App - Sign In</h2>
        <div className="login-form-group-unique">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="login-form-group-unique">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn-primary-unique">Submit</button>
      </form>
      <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </div>
  );
};

export default Login;
