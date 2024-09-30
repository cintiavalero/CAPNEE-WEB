import React from 'react';
import Fondo from '../components/FondoA';
import "./Styles/Login.css";
import logo from '../assets/logo_capnee.png'; 

function Login() {
  return (
    <Fondo>
      <div className="login-container">
        <div className="login-box">
          <img className="logo" src={logo} alt="CAPNEE Logo" />                                     
          <h3>Iniciar Sesión</h3>
          <form>
            <div className="input-group">
              <label htmlFor="username">Nombre de usuario:</label>
              <input type="text" id="username" name="username" required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Contraseña:</label>
              <input type="password" id="password" name="password" required />
            </div>
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
