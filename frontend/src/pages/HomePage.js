import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CircuitBoard, Star, ArrowRight } from 'lucide-react';
import { Particles } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import api from '../utils/api';
import Footer from '../components/Footer';

export const HomePage = () => {
  const [content, setContent] = useState(null);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [hoveredService, setHoveredService] = useState(null);
  const [particlesInit, setParticlesInit] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(false);

  useEffect(() => {
    fetchData();
    setTimeout(() => setShowTypewriter(true), 1000);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  const fetchData = async () => {
    try {
      const [contentRes, servicesRes, testimonialsRes] = await Promise.all([
        api.get('/content'),
        api.get('/services'),
        api.get('/testimonials'),
      ]);
      setContent(contentRes.data);
      setServices(servicesRes.data);
      setTestimonials(testimonialsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const particlesLoaded = async (engine) => {
    await loadSlim(engine);
    setParticlesInit(true);
  };

  const particlesOptions = {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: '#FFD700' },
      shape: { type: 'circle' },
      opacity: { value: 0.8, random: true },
      size: { value: 3, random: true },
      move: {
        enable: true,
        speed: 1,
        direction: 'top',
        random: true,
        straight: false,
        outModes: { default: 'out' },
      },
    },
  };

  if (!content) return <div className="min-h-screen flex items-center justify-center">Cargando</div>;

  return (
    <div className="min-h-screen" data-testid="home-page">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(13, 180, 185, 0.1) 0%, rgba(109, 40, 217, 0.1) 100%), url(${content.hero_bg_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        data-testid="hero-section"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/60"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="floating-logo pulse-glow mb-8"
            data-testid="hero-logo"
          >
            {content.logo_url ? (
              <img src={content.logo_url} alt="Almy.W.E.B. Logo" className="w-32 h-32 md:w-48 md:h-48 mx-auto" />
            ) : (
              <CircuitBoard className="w-32 h-32 md:w-48 md:h-48 mx-auto text-[#6D28D9]" />
            )}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-4"
            data-testid="hero-title"
          >
            <span className="gradient-text">{content.hero_title}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 italic"
            data-testid="hero-slogan"
          >
            {content.hero_slogan}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#services" className="btn-primary" data-testid="hero-cta-services">
              Ver Servicios
            </a>
            <a href="/portfolio" className="btn-secondary" data-testid="hero-cta-portfolio">
              Portafolio
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4" data-testid="services-section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Nuestros Servicios</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tarifas especiales de lanzamiento, disenadas para ser accesibles y ajustadas a sus necesidades
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                onMouseEnter={() => setHoveredService(service.is_featured ? service.id : null)}
                onMouseLeave={() => setHoveredService(null)}
                className={`relative bg-white rounded-3xl p-8 shadow-lg hover-lift service-card ${
                  service.is_featured ? 'featured-card' : ''
                }`}
                data-testid={`service-card-${index}`}
              >
                {service.is_featured && (
                  <>
                    <div className="featured-badge" data-testid="featured-badge">RECOMENDADO</div>
                    {hoveredService === service.id && particlesInit && (
                      <div className="particles-container" data-testid="gold-particles">
                        <Particles id={`particles-${service.id}`} options={particlesOptions} />
                      </div>
                    )}
                  </>
                )}

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 text-[#6D28D9]" data-testid={`service-title-${index}`}>
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6" data-testid={`service-description-${index}`}>
                    {service.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <p className="text-sm text-gray-500">
                      <strong>Paginas:</strong> {service.pages}
                    </p>
                    {service.features && (
                      <div className="text-sm text-gray-500">
                        <strong>Incluye:</strong>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          {service.features.split('|').map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-6">
                    <div className="text-4xl font-bold text-[#0DB4B9] mb-2" data-testid={`service-price-${index}`}>
                      ${service.price.toFixed(2)}
                    </div>
                    <p className="text-sm text-gray-500">
                      Renovacion anual: ${service.renewal_price.toFixed(2)}
                    </p>
                  </div>

                  <button
                    className="w-full mt-6 btn-primary"
                    onClick={() => window.location.href = '/contacto'}
                    data-testid={`service-cta-${index}`}
                  >
                    Contratar ahora
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#F8FAFC] to-white" data-testid="mission-vision-section">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glassmorphism rounded-3xl p-8 shadow-xl"
              data-testid="mission-card"
            >
              <h3 className="text-3xl font-bold mb-4 text-[#6D28D9]">Nuestra Mision</h3>
              <p className="text-gray-700 leading-relaxed" data-testid="mission-content">
                {content.mission}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glassmorphism rounded-3xl p-8 shadow-xl"
              data-testid="vision-card"
            >
              <h3 className="text-3xl font-bold mb-4 text-[#0DB4B9]">Nuestra Vision</h3>
              <p className="text-gray-700 leading-relaxed" data-testid="vision-content">
                {content.vision}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Lo que dicen nuestros clientes</h2>
            <p className="text-lg text-gray-600">Testimonios reales de empresas que confian en nosotros</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover-lift"
                data-testid={`testimonial-card-${index}`}
              >
                <div className="flex items-center mb-4">
                  {testimonial.avatar_url ? (
                    <img
                      src={testimonial.avatar_url}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                      data-testid={`testimonial-avatar-${index}`}
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0DB4B9] to-[#6D28D9] mr-4"></div>
                  )}
                  <div>
                    <h4 className="font-bold text-lg" data-testid={`testimonial-name-${index}`}>{testimonial.name}</h4>
                    {testimonial.company && (
                      <p className="text-sm text-gray-500" data-testid={`testimonial-company-${index}`}>{testimonial.company}</p>
                    )}
                  </div>
                </div>

                <div className="flex mb-4" data-testid={`testimonial-rating-${index}`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-600 italic" data-testid={`testimonial-content-${index}`}>
                  "{testimonial.content}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;