import React, { useState } from 'react';
import Fondo from '../components/FondoA';
import "./Styles/Login.css";
import logo from '../assets/logo_capnee.png'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_URL = 'http://149.50.140.55:8081';

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${API_URL}/auth/user-password`, {user, password});
  
      const token = response.data.accessToken;
      console.log('Respuesta del servidor:', response.data.accessToken);
      
      if (token) {
        localStorage.setItem('token', token);
        console.log('Inicio de sesión exitoso');
        console.log('Token: ', token);
        navigate('/listadocursos');
      } else {
        setError('No se pudo obtener el token de autenticación.');
      }

    } catch (error) {
      console.error('Error durante el inicio de sesión: ', error);
      setError("No se puede iniciar sesión. Verifica tus credenciales.");
    }   
  };

  return (
    <Fondo>
      <div className="login">
        <div className="login-box">
          <img className="logo" src={logo} alt="CAPNEE Logo" />                                     
          <h3>Iniciar Sesión</h3>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="username">Nombre de usuario:</label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                value={user}
                onChange={(e) => setUser(e.target.value)} 
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Contraseña:</label>
              <input 
                type="password" 
                id="password" 
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className="login-btn">Iniciar sesión</button>
          </form>
        </div>
        <footer className="footer">
          <p>© GIDAS - 2024</p>
        </footer>
      </div>
    </Fondo>
  );
}

export default Login;
