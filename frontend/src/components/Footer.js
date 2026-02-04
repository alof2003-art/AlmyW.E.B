import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../utils/api';

export const Footer = () => {
  const [config, setConfig] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      const [configRes, socialRes] = await Promise.all([
        api.get('/footer-config'),
        api.get('/social-links'),
      ]);
      setConfig(configRes.data);
      setSocialLinks(socialRes.data);
    } catch (error) {
      console.error('Error fetching footer data:', error);
    }
  };

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'Facebook':
        return Facebook;
      case 'Instagram':
        return Instagram;
      case 'MessageCircle':
        return MessageCircle;
      default:
        return MessageCircle;
    }
  };

  const handleCopyrightClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount === 2) {
      navigate('/admin/login');
      setClickCount(0);
    }
    setTimeout(() => setClickCount(0), 2000);
  };

  if (!config) return null;

  const isContactPage = location.pathname === '/contacto';
  const showAuthors = isContactPage || config.show_authors;

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-4" data-testid="footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div data-testid="footer-brand">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-[#6D28D9]">Almy</span>
              <span className="text-[#0DB4B9]">.W.E.B.</span>
            </h3>
            <p className="text-gray-400">Tu imagen digital</p>
          </div>

          <div data-testid="footer-location">
            <h4 className="font-bold mb-4 text-lg">Ubicacion</h4>
            <p className="text-gray-400 mb-4">{config.location_name}</p>
            <div className="rounded-lg overflow-hidden" style={{ height: '200px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.302614992877!2d-78.68194!3d-1.65444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d38e6daa1f09c3%3A0x6c5e3c6f9c0c5f0!2sESPOCH!5e0!3m2!1ses!2sec!4v1234567890"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ESPOCH Location"
              ></iframe>
            </div>
          </div>

          <div data-testid="footer-social">
            <h4 className="font-bold mb-4 text-lg">Siguenos</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const IconComponent = getIconComponent(link.icon_name);
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#0DB4B9] transition-all duration-300 hover:scale-110"
                    data-testid={`social-link-${link.platform.toLowerCase()}`}
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          {showAuthors && config.authors && (
            <p className="text-sm text-gray-400 mb-2" data-testid="footer-authors">
              Autores: {config.authors.split('|').join(', ')}
            </p>
          )}
          <p 
            className="text-sm text-gray-400 cursor-default select-none" 
            data-testid="footer-copyright"
            onClick={handleCopyrightClick}
          >
            {new Date().getFullYear()} {config.copyright_text}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;