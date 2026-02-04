import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import Footer from '../components/Footer';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    cedula: '',
    address: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.description) {
      toast.error('Por favor completa los campos obligatorios');
      return;
    }

    const message = `Hola, soy ${formData.firstName} ${formData.lastName}.%0A%0A${formData.description}${
      formData.cedula ? `%0A%0ACedula: ${formData.cedula}` : ''
    }${
      formData.address ? `%0A%0ADireccion: ${formData.address}` : ''
    }`;

    const whatsappUrl = `https://wa.me/593992286986?text=${message}`;
    window.open(whatsappUrl, '_blank');
    toast.success('Redirigiendo a WhatsApp...');
  };

  return (
    <div className="min-h-screen pt-24" data-testid="contact-page">
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
          <p className="text-lg text-gray-600">Listo para iniciar tu proyecto? Contactanos ahora</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
          data-testid="contact-form-container"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" data-testid="label-firstname">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#0DB4B9] outline-none transition-colors"
                  placeholder="Tu nombre"
                  required
                  data-testid="input-firstname"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" data-testid="label-lastname">
                  Apellido <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#0DB4B9] outline-none transition-colors"
                  placeholder="Tu apellido"
                  required
                  data-testid="input-lastname"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" data-testid="label-cedula">
                Cedula (Opcional)
              </label>
              <input
                type="text"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#0DB4B9] outline-none transition-colors"
                placeholder="Tu numero de cedula"
                data-testid="input-cedula"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" data-testid="label-address">
                Direccion (Opcional)
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#0DB4B9] outline-none transition-colors"
                placeholder="Tu direccion"
                data-testid="input-address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" data-testid="label-description">
                Descripcion de tu proyecto <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#0DB4B9] outline-none transition-colors resize-none"
                placeholder="Cuentanos sobre tu proyecto, que necesitas y cualquier detalle importante..."
                required
                data-testid="input-description"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary flex items-center justify-center gap-2 text-lg py-4"
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