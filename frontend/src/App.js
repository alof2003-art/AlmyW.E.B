import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import Navbar from './components/Navbar';
import './App.css';

// Portfolio Examples - Paginas de demostración
import ArquitecturaModerna from './pages/portfolio-examples/ArquitecturaModerna';
import ArquitecturaUrbanismo from './pages/portfolio-examples/ArquitecturaUrbanismo';
import BoutiqueModa from './pages/portfolio-examples/BoutiqueModa';
import CentroClinico from './pages/portfolio-examples/CentroClinico';
import CentroMedico from './pages/portfolio-examples/CentroMedico';
import ClinicaDental from './pages/portfolio-examples/ClinicaDental';
import RetailHogar from './pages/portfolio-examples/RetailHogar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Navbar /><HomePage /></>} />
          <Route path="/portfolio" element={<><Navbar /><PortfolioPage /></>} />
          <Route path="/contacto" element={<><Navbar /><ContactPage /></>} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/*" element={<DashboardPage />} />
          
          {/* Rutas de ejemplos del portafolio */}
          <Route path="/portfolio/arquitectura-moderna" element={<ArquitecturaModerna />} />
          <Route path="/portfolio/arquitectura-urbanismo" element={<ArquitecturaUrbanismo />} />
          <Route path="/portfolio/boutique-moda" element={<BoutiqueModa />} />
          <Route path="/portfolio/centro-clinico" element={<CentroClinico />} />
          <Route path="/portfolio/centro-medico" element={<CentroMedico />} />
          <Route path="/portfolio/clinica-dental" element={<ClinicaDental />} />
          <Route path="/portfolio/retail-hogar" element={<RetailHogar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;