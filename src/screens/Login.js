import React, { useState } from 'react';
import Fondo from '../components/FondoA';
import "./Styles/Login.css";
import logo from '../assets/logo_capnee.png'; 
import { useNavigate } from 'react-router-dom';

const usuarioPrueba = {
  username: 'cintia',
  password: '123456'
};

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === usuarioPrueba.username && password === usuarioPrueba.password) {
      navigate('/listadocursos')
    } else {
      setError('Credenciales incorrectas');
    }
  };


  return (
    <Fondo>
      <div className="login-container">
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
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
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
