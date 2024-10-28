import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './screens/Login'
import ListadoCursos from './screens/ListadoCursos';
import GestionAlumnos from './screens/GestionAlumnos';
import GestionBloques from './screens/GestionBloques';
import GestionSubBloques from './screens/GestionSubBloques';
import GestionActividades from './screens/GestionActividades';
import GestionEjercicios from './screens/GestionEjercicios';
import Perfil from './screens/Perfil';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App/> */}
    <Router>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/perfil" element={<Perfil/>} />
          <Route path="/listadocursos" element={<ListadoCursos/>} />
          <Route path="/gestionalumnos/curso/:idCurso" element={<GestionAlumnos/>} />
          <Route path="/gestionbloques/curso/:idCurso" element={<GestionBloques/>} />
          <Route path="/gestionsubbloques/curso/:idCurso/bloque/:idBloque" element={<GestionSubBloques/>} />
          <Route path="/gestionactividades/curso/:idCurso/sub-bloque/:idSubBloque" element={<GestionActividades/>} />
          <Route path="/gestionejercicios/curso/:idCurso/actividad/:idActividad" element={<GestionEjercicios/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
reportWebVitals();