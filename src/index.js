import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './screens/ListadoCursos';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './screens/Login'
import ListadoCursos from './screens/ListadoCursos';
import GestionAlumnos from './screens/GestionAlumnos';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App/> */}
    <Router>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/listadocursos" element={<ListadoCursos/>} />
          <Route path="/gestionalumnos" element={<GestionAlumnos/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
reportWebVitals();