import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import api from '../utils/api';

export const Footer = () => {
  const [config, setConfig] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const location = useLocation();

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
            <h4 className="font-bold mb-4 text-lg">Ubicación</h4>
            <p className="text-gray-400 mb-4">{config.location_name}</p>
            <p className="text-sm text-gray-500">{config.location_address}</p>
            <a
              href={`https://www.google.com/maps?q=${config.map_lat},${config.map_lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-[#0DB4B9] hover:underline"
              data-testid="footer-map-link"
            >
              Ver en Google Maps
            </a>
          </div>

          <div data-testid="footer-social">
            <h4 className="font-bold mb-4 text-lg">Síguenos</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const IconComponent = getIconComponent(link.icon_name);
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#0DB4B9] transition-colors"
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
          <p className="text-sm text-gray-400" data-testid="footer-copyright">
            © {new Date().getFullYear()} {config.copyright_text}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;