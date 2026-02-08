import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Package, X } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

export const ContactPage = () => {
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    cedula: '',
    address: '',
    description: '',
  });

  // Recibir plan seleccionado desde la navegación
  useEffect(() => {
    if (location.state?.selectedPlan) {
      setSelectedPlan(location.state.selectedPlan);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clearPlan = () => {
    setSelectedPlan(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.description) {
      toast.error('Por favor completa los campos obligatorios');
      return;
    }

    // Construir mensaje con emojis
    let message = `👋 *¡Hola!*%0A%0A`;
    message += `👤 *Nombre:* ${formData.firstName} ${formData.lastName}%0A`;
    
    if (formData.cedula) {
      message += `🪪 *Cédula:* ${formData.cedula}%0A`;
    }
    
    if (formData.address) {
      message += `📍 *Dirección:* ${formData.address}%0A`;
    }
    
    message += `%0A📝 *Descripción del proyecto:*%0A${formData.description}`;
    
    // Agregar información del plan si está seleccionado
    if (selectedPlan) {
      message += `%0A%0A━━━━━━━━━━━━━━━━━━━━%0A`;
      message += `📦 *PLAN SELECCIONADO*%0A`;
      message += `━━━━━━━━━━━━━━━━━━━━%0A`;
      message += `✨ *Plan:* ${selectedPlan.title}%0A`;
      message += `💰 *Precio:* $${selectedPlan.price}%0A`;
      message += `🔄 *Renovación:* $${selectedPlan.renewal_price}/año%0A`;
      message += `📄 *Páginas:* ${selectedPlan.pages}%0A`;
      if (selectedPlan.features) {
        message += `%0A🎯 *Características:*%0A`;
        selectedPlan.features.split('|').forEach(feature => {
          message += `   ✅ ${feature.trim()}%0A`;
        });
      }
    }
    
    message += `%0A%0A🙏 *¡Gracias por contactarnos!*`;

    const whatsappUrl = `https://wa.me/593992286986?text=${message}`;
    window.open(whatsappUrl, '_blank');
    toast.success('Redirigiendo a WhatsApp...');
  };

  return (
    <div className="min-h-screen pt-24 dark:bg-gray-900" data-testid="contact-page">
      <Toaster position="top-center" richColors />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="contact-title">
            <span className="gradient-text">Contacto</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Listo para iniciar tu proyecto? Contactanos ahora</p>
        </motion.div>

        {/* Mostrar plan seleccionado */}
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-[#0DB4B9]/10 to-[#6D28D9]/10 border-2 border-[#0DB4B9] rounded-2xl p-6 mb-8 relative"
          >
            <button
              onClick={clearPlan}
              className="absolute top-4 right-4 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0DB4B9] to-[#6D28D9] flex items-center justify-center">
                <Package className="text-white" size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Plan seleccionado:</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedPlan.title}</h3>
                <p className="text-[#0DB4B9] font-bold text-lg">${selectedPlan.price} <span className="text-sm text-gray-500 font-normal">/ inicio</span></p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12"
          data-testid="contact-form-container"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" data-testid="label-firstname">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#0DB4B9] outline-none transition-colors"
                  placeholder="Tu nombre"
                  required
                  data-testid="input-firstname"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" data-testid="label-lastname">
                  Apellido <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#0DB4B9] outline-none transition-colors"
                  placeholder="Tu apellido"
                  required
                  data-testid="input-lastname"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" data-testid="label-cedula">
                Cedula (Opcional)
              </label>
              <input
                type="text"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#0DB4B9] outline-none transition-colors"
                placeholder="Tu numero de cedula"
                data-testid="input-cedula"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" data-testid="label-address">
                Direccion (Opcional)
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#0DB4B9] outline-none transition-colors"
                placeholder="Tu direccion"
                data-testid="input-address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" data-testid="label-description">
                Descripcion de tu proyecto <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#0DB4B9] outline-none transition-colors resize-none"
                placeholder="Cuentanos sobre tu proyecto, que necesitas y cualquier detalle importante..."
                required
                data-testid="input-description"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary flex items-center justify-center gap-2 text-lg py-4 border-2 border-[#0DB4B9]"
              data-testid="contact-submit-button"
            >
              <Send size={20} />
              Comunicarse por WhatsApp
            </button>
          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
