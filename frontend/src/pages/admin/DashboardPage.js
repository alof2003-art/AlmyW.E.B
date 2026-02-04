import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  Briefcase,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  FileText,
  Layout,
  DollarSign
} from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { isAuthenticated, clearAuth, getUsername } from '../../utils/auth';
import ContentManager from '../../components/admin/ContentManager';
import ServicesManager from '../../components/admin/ServicesManager';
import PortfolioManager from '../../components/admin/PortfolioManager';
import TestimonialsManager from '../../components/admin/TestimonialsManager';
import FooterManager from '../../components/admin/FooterManager';

export const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    clearAuth();
    toast.success('Sesión cerrada');
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Contenido', path: '/admin/dashboard', icon: Layout },
    { name: 'Servicios', path: '/admin/services', icon: DollarSign },
    { name: 'Portafolio', path: '/admin/portfolio', icon: Briefcase },
    { name: 'Testimonios', path: '/admin/testimonials', icon: MessageSquare },
    { name: 'Footer', path: '/admin/footer', icon: Settings },
  ];

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex" data-testid="dashboard-page">
      <Toaster position="top-center" richColors />

      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } flex flex-col`}
        data-testid=\"dashboard-sidebar\"
      >
        <div className=\"p-6 border-b border-gray-200\">
          <div className=\"flex items-center justify-between\">
            {sidebarOpen && (
              <h2 className=\"text-xl font-bold\">
                <span className=\"text-[#6D28D9]\">Almy</span>
                <span className=\"text-[#0DB4B9]\">.W.E.B.</span>
              </h2>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className=\"p-2 hover:bg-gray-100 rounded-lg transition-colors\"
              data-testid=\"sidebar-toggle\"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <nav className=\"flex-1 p-4 space-y-2\">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#0DB4B9] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                data-testid={`nav-${item.name.toLowerCase()}`}
              >
                <Icon size={20} />
                {sidebarOpen && <span className=\"font-medium\">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className=\"p-4 border-t border-gray-200\">
          <div className=\"mb-4\">
            {sidebarOpen && (
              <div className=\"text-sm text-gray-600\">
                <p className=\"font-medium\">Usuario:</p>
                <p>{getUsername()}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className=\"flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-red-600 hover:bg-red-50 transition-colors\"
            data-testid=\"logout-button\"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className=\"font-medium\">Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className=\"flex-1 overflow-auto\">
        <div className=\"p-8\">
          <Routes>
            <Route path=\"dashboard\" element={<ContentManager />} />
            <Route path=\"services\" element={<ServicesManager />} />
            <Route path=\"portfolio\" element={<PortfolioManager />} />
            <Route path=\"testimonials\" element={<TestimonialsManager />} />
            <Route path=\"footer\" element={<FooterManager />} />
            <Route path=\"*\" element={<Navigate to=\"/admin/dashboard\" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;