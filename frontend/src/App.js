import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import Navbar from './components/Navbar';
import './App.css';

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;