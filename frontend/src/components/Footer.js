import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Linkedin, Twitter, MapPin, Mail, Phone, MessageCircle } from 'lucide-react';
import api from '../utils/api';

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const [configRes, socialRes] = await Promise.all([
          api.get('/footer/config'),
          api.get('/footer/social')
        ]);
        setFooterData(configRes.data);
        setSocialLinks(socialRes.data);
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    };
    fetchFooterData();
  }, []);

  const handleCopyrightClick = () => {
    setClickCount(prev => prev + 1);
    
    // Limpiar el timer anterior
    if (clickTimer) {
      clearTimeout(clickTimer);
    }
    
    // Si es el tercer clic, redirigir al admin
    if (clickCount + 1 === 3) {
      window.location.href = '/admin/login';
      setClickCount(0);
      return;
    }
    
    // Resetear el contador después de 1 segundo
    const timer = setTimeout(() => {
      setClickCount(0);
    }, 1000);
    
    setClickTimer(timer);
  };

  const getSocialIcon = (platform) => {
    const icons = {
      facebook: <Facebook size={24} />,
      instagram: <Instagram size={24} />,
      linkedin: <Linkedin size={24} />,
      twitter: <Twitter size={24} />,
      whatsapp: <MessageCircle size={24} />,
    };
    return icons[platform.toLowerCase()] || null;
  };

  if (!footerData) return null;

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-[#1a1a2e] to-gray-900 text-white py-16 relative overflow-hidden" data-testid="footer">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0DB4B9] via-[#6D28D9] to-[#0DB4B9]"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#0DB4B9]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#6D28D9]/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Main Footer Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Columna Izquierda - Logo y descripción */}
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-black mb-4">
              <span className="text-[#0DB4B9]">Almy</span>
              <span className="text-white">.W.E.B.</span>
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Transformamos tus ideas en experiencias digitales únicas. Diseño web profesional para hacer crecer tu negocio.
            </p>
            {/* Contacto */}
            <div className="space-y-3">
              {footerData.email && (
                <a href={`mailto:${footerData.email}`} className="flex items-center gap-3 text-gray-400 hover:text-[#0DB4B9] transition-colors justify-center md:justify-start">
                  <Mail size={18} />
                  <span>{footerData.email}</span>
                </a>
              )}
              {footerData.phone && (
                <a href={`tel:${footerData.phone}`} className="flex items-center gap-3 text-gray-400 hover:text-[#0DB4B9] transition-colors justify-center md:justify-start">
                  <Phone size={18} />
                  <span>{footerData.phone}</span>
                </a>
              )}
            </div>
          </div>
          
          {/* Columna Centro - Síguenos y Ubicación */}
          <div className="text-center">
            {/* Redes Sociales */}
            <h4 className="text-xl font-bold mb-6 text-white">Síguenos</h4>
            <div className="flex justify-center gap-4 mb-8">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#0DB4B9] hover:scale-110 transition-all duration-300 border border-white/20 hover:border-[#0DB4B9]"
                  data-testid={`social-${link.platform.toLowerCase()}`}
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
            </div>
            
            {/* Ubicación */}
            <h4 className="text-xl font-bold mb-4 text-white">Ubicación</h4>
            <div className="flex items-start gap-3 text-gray-400 justify-center">
              <MapPin size={20} className="text-[#0DB4B9] flex-shrink-0 mt-1" />
              <span className="text-sm">
                {footerData.location_name && <strong>{footerData.location_name}</strong>}
                {footerData.location_name && <br />}
                {footerData.location_address || 'Escuela Superior Politécnica de Chimborazo, Riobamba, Chimborazo, Ecuador'}
              </span>
            </div>
          </div>
          
          {/* Columna Derecha - Mapa de Google */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-xl font-bold mb-4 text-white">Encuéntranos</h4>
            <div className="w-full max-w-[300px] h-[200px] rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.0!2d${footerData.map_lng || '-78.6795'}!3d${footerData.map_lat || '-1.6544'}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d3a828e2c0c5e5%3A0x7c4e5f6a7b8c9d0e!2sESPOCH!5e0!3m2!1ses!2sec!4v1699999999999!5m2!1ses!2sec`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Almy.W.E.B."
              ></iframe>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p 
              className="text-gray-400 text-sm text-center md:text-left cursor-default select-none"
              onClick={handleCopyrightClick}
              style={{ userSelect: 'none' }}
            >
              © {new Date().getFullYear()} Almy.W.E.B. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-[#0DB4B9] transition-colors">Términos</a>
              <a href="#" className="hover:text-[#0DB4B9] transition-colors">Privacidad</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
