import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CircuitBoard, Lock, User } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import api from '../../utils/api';
import { setAuth } from '../../utils/auth';

export const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/auth/login', credentials);
      setAuth(response.data.token, response.data.username);
      toast.success('Bienvenido!');
      setTimeout(() => navigate('/admin/dashboard'), 500);
    } catch (error) {
      toast.error('Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: 'linear-gradient(135deg, rgba(13, 180, 185, 0.1) 0%, rgba(109, 40, 217, 0.1) 100%)',
      }}
      data-testid="login-page"
    >
      <Toaster position="top-center" richColors />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <CircuitBoard className="w-16 h-16 mx-auto text-[#6D28D9] mb-4" />
          <h1 className="text-3xl font-bold" data-testid="login-title">
            <span className="text-[#6D28D9]">Almy</span>
            <span className="text-[#0DB4B9]">.W.E.B.</span>
          </h1>
          <p className="text-gray-600 mt-2">Panel de Administracion</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usuario
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#0DB4B9] outline-none transition-colors"
                placeholder="admin"
                required
                data-testid="login-username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contrasena
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#0DB4B9] outline-none transition-colors"
                placeholder="••••••••"
                required
                data-testid="login-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 text-lg"
            data-testid="login-submit"
          >
            {loading ? 'Iniciando sesion...' : 'Iniciar Sesion'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;