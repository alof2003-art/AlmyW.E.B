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
      {/* Fondos animados mejorados */}
      <div className="animated-gradient-bg"></div>
      <div className="floating-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
      <div className="circuit-grid"></div>
      <div className="floating-shapes">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`shape shape-${i % 3}`} style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`
          }}></div>
        ))}
      </div>
      
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        data-testid="hero-section"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white/70"></div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="floating-logo pulse-glow mb-12"
            data-testid="hero-logo"
          >
            <div className="logo-container mx-auto" style={{ width: '280px', height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {content.logo_url ? (
                <img 
                  src={content.logo_url} 
                  alt="Almy.W.E.B. Logo" 
                  className="w-full h-full object-contain drop-shadow-2xl"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              ) : (
                <CircuitBoard className="w-56 h-56 text-[#6D28D9]" />
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <p
              className={`text-3xl md:text-4xl lg:text-5xl text-gray-600 font-light italic ${showTypewriter ? 'typewriter' : ''}`}
              data-testid="hero-slogan"
              style={{ display: 'inline-block' }}
            >
              {content.hero_slogan}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <a href="#services" className="btn-primary shimmer-effect" data-testid="hero-cta-services">
              Ver Servicios <ArrowRight className="inline ml-2" size={20} />
            </a>
            <a href="/portfolio" className="btn-secondary" data-testid="hero-cta-portfolio">
              Explorar Portafolio
            </a>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6D28D9]/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-[#0DB4B9]/10 to-[#6D28D9]/10 text-[#6D28D9] rounded-full text-sm font-semibold mb-6 border border-[#6D28D9]/20">
              TECNOLOGIAS QUE DOMINAMOS
            </span>
          </motion.div>
          
          <div className="tech-slider">
            <div className="tech-track">
              {['React', 'Node.js', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Python', 'FastAPI', 'Supabase', 'Vercel', 'Firebase', 'Git', 'React', 'Node.js', 'MongoDB', 'PostgreSQL'].map((tech, index) => (
                <div key={index} className="tech-item glass-card">
                  <span className="text-2xl font-bold gradient-text">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-4 relative" data-testid="services-section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 fade-in-up"
          >
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-[#0DB4B9]/10 to-[#6D28D9]/10 text-[#6D28D9] rounded-full text-sm font-semibold mb-6 border border-[#6D28D9]/20">
              NUESTRAS SOLUCIONES
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 gradient-text">Planes a tu Medida</h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Tarifas especiales de lanzamiento, disenadas para impulsar tu presencia digital
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                onMouseEnter={() => setHoveredService(service.is_featured ? service.id : null)}
                onMouseLeave={() => setHoveredService(null)}
                className={`relative glass-card rounded-[2rem] p-10 service-card fade-in-up ${
                  service.is_featured ? 'featured-card' : ''
                }`}
                data-testid={`service-card-${index}`}
              >
                {service.is_featured && (
                  <>
                    <div className="featured-badge" data-testid="featured-badge">
                      ⭐ Mas Popular
                    </div>
                    {hoveredService === service.id && particlesInit && (
                      <div className="particles-container" data-testid="gold-particles">
                        <Particles id={`particles-${service.id}`} options={particlesOptions} />
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="sparkle"
                            style={{
                              left: `${15 + i * 12}%`,
                              bottom: '15%',
                              animationDelay: `${i * 0.2}s`
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}

                <div className="relative z-10">
                  <div className="mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0DB4B9] to-[#6D28D9] flex items-center justify-center mb-6 shimmer-effect">
                      <Star className="text-white" size={32} />
                    </div>
                    <h3 className="text-3xl font-black mb-4 text-gray-900" data-testid={`service-title-${index}`}>
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed" data-testid={`service-description-${index}`}>
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-[#0DB4B9]"></div>
                      <span className="font-semibold">Paginas:</span> {service.pages}
                    </div>
                    {service.features && (
                      <div className="space-y-3">
                        {service.features.split('|').map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#10B981]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                            </div>
                            <span className="text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-200 pt-8 mb-8">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-6xl font-black gradient-text" data-testid={`service-price-${index}`}>
                        ${service.price.toFixed(0)}
                      </span>
                      <span className="text-gray-500 text-lg">/inicio</span>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <span className="text-2xl">🔄</span>
                      ${service.renewal_price.toFixed(0)}/ano renovacion
                    </p>
                  </div>

                  <button
                    className="w-full btn-primary shimmer-effect"
                    onClick={() => window.location.href = '/contacto'}
                    data-testid={`service-cta-${index}`}
                  >
                    Comenzar Ahora <ArrowRight className="inline ml-2" size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-32 px-4 relative overflow-hidden" data-testid="mission-vision-section">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0DB4B9]/5 via-transparent to-[#6D28D9]/5"></div>
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-[#6D28D9]/10 to-[#0DB4B9]/10 text-[#6D28D9] rounded-full text-sm font-semibold mb-6 border border-[#6D28D9]/20">
              NUESTRO PROPOSITO
            </span>
            <h2 className="text-5xl md:text-6xl font-black gradient-text">Quienes Somos</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-[2rem] p-12 relative overflow-hidden group"
              data-testid="mission-card"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#6D28D9]/10 to-transparent rounded-bl-[4rem]"></div>
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6D28D9] to-[#8B5CF6] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl">🎯</span>
                </div>
                <h3 className="text-4xl font-black mb-6 text-gray-900">Nuestra Mision</h3>
                <p className="text-gray-700 text-lg leading-relaxed" data-testid="mission-content">
                  {content.mission}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-[2rem] p-12 relative overflow-hidden group"
              data-testid="vision-card"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0DB4B9]/10 to-transparent rounded-bl-[4rem]"></div>
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0DB4B9] to-[#10B981] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl">🚀</span>
                </div>
                <h3 className="text-4xl font-black mb-6 text-gray-900">Nuestra Vision</h3>
                <p className="text-gray-700 text-lg leading-relaxed" data-testid="vision-content">
                  {content.vision}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-4 relative" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-[#0DB4B9]/10 to-[#6D28D9]/10 text-[#6D28D9] rounded-full text-sm font-semibold mb-6 border border-[#6D28D9]/20">
              TESTIMONIOS
            </span>
            <h2 className="text-5xl md:text-6xl font-black mb-6 gradient-text">Clientes Satisfechos</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Historias reales de empresas que transformaron su presencia digital</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="glass-card rounded-[2rem] p-10 testimonial-card relative"
                data-testid={`testimonial-card-${index}`}
              >
                <div className="flex items-center mb-6">
                  {testimonial.avatar_url ? (
                    <img
                      src={testimonial.avatar_url}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-2xl object-cover mr-5 ring-4 ring-white shadow-lg"
                      data-testid={`testimonial-avatar-${index}`}
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0DB4B9] to-[#6D28D9] mr-5 ring-4 ring-white shadow-lg"></div>
                  )}
                  <div>
                    <h4 className="font-black text-xl text-gray-900" data-testid={`testimonial-name-${index}`}>{testimonial.name}</h4>
                    {testimonial.company && (
                      <p className="text-sm text-gray-500 font-medium" data-testid={`testimonial-company-${index}`}>{testimonial.company}</p>
                    )}
                  </div>
                </div>

                <div className="flex mb-6" data-testid={`testimonial-rating-${index}`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-600 text-lg leading-relaxed italic" data-testid={`testimonial-content-${index}`}>
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