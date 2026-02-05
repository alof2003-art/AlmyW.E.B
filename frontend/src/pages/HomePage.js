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
      {/* Fondos animados ULTRA PREMIUM */}
      <div className="premium-animated-bg">
        {/* Mesh Gradient Background */}
        <div className="mesh-gradient-bg"></div>
        
        {/* Animated Grid */}
        <div className="perspective-grid"></div>
        
        {/* Floating Orbs con Blur */}
        <div className="floating-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        
        {/* Light Beams */}
        <div className="light-beams">
          <div className="beam beam-1"></div>
          <div className="beam beam-2"></div>
          <div className="beam beam-3"></div>
        </div>
        
        {/* Particles System */}
        <div className="particles-system">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Wave Lines */}
        <svg className="wave-lines" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path className="wave-path wave-1" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,186.7C672,203,768,181,864,154.7C960,128,1056,96,1152,101.3C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="rgba(109, 40, 217, 0.03)"/>
          <path className="wave-path wave-2" d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,234.7C672,245,768,235,864,213.3C960,192,1056,160,1152,154.7C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="rgba(13, 180, 185, 0.02)"/>
        </svg>
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
            className="mb-12 px-4"
          >
            <p
              className="text-3xl md:text-4xl lg:text-5xl text-gray-600 font-light italic inline-block"
              data-testid="hero-slogan"
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

      {/* Tech Stack Section - 3D Pills with Logos */}
      <section className="py-24 px-4 overflow-hidden relative bg-gradient-to-b from-white to-gray-50">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-[#0DB4B9]/10 to-[#6D28D9]/10 text-[#6D28D9] rounded-full text-sm font-semibold mb-6 border border-[#6D28D9]/20">
              TECNOLOGIAS QUE DOMINAMOS
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4">Stack Tecnologico Completo</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trabajamos con las herramientas mas avanzadas del mercado
            </p>
          </motion.div>
          
          {/* Spotlight Center Indicator - HIDDEN */}
          <div className="spotlight-indicator" style={{ display: 'none' }}>
            <div className="spotlight-line"></div>
          </div>
          
          {/* 3D Pills Carousel with Logos - Multiple Rows */}
          <div className="space-y-8">
            <div className="tech-carousel">
              <div className="tech-carousel-track">
                {[
                  {name: 'React', devicon: 'react', simple: 'react', color: '61DAFB'},
                  {name: 'Vue.js', devicon: 'vuejs', simple: 'vuedotjs', color: '4FC08D'},
                  {name: 'Angular', devicon: 'angularjs', simple: 'angular', color: 'DD0031'},
                  {name: 'Next.js', devicon: 'nextjs', simple: 'nextdotjs', color: '000000'},
                  {name: 'Svelte', devicon: 'svelte', simple: 'svelte', color: 'FF3E00'},
                  {name: 'Node.js', devicon: 'nodejs', simple: 'nodedotjs', color: '339933'},
                  {name: 'Express', devicon: 'express', simple: 'express', color: '000000'},
                  {name: 'NestJS', devicon: 'nestjs', simple: 'nestjs', color: 'E0234E'},
                  {name: 'Python', devicon: 'python', simple: 'python', color: '3776AB'},
                  {name: 'Django', devicon: 'django', simple: 'django', color: '092E20', usePlain: true},
                  {name: 'Flask', devicon: 'flask', simple: 'flask', color: '000000'},
                  {name: 'FastAPI', devicon: 'fastapi', simple: 'fastapi', color: '009688'},
                  {name: 'MongoDB', devicon: 'mongodb', simple: 'mongodb', color: '47A248'},
                  {name: 'PostgreSQL', devicon: 'postgresql', simple: 'postgresql', color: '4169E1'},
                  {name: 'MySQL', devicon: 'mysql', simple: 'mysql', color: '4479A1'},
                  {name: 'Redis', devicon: 'redis', simple: 'redis', color: 'DC382D'}
                ].map((tech, index) => (
                  <div key={index} className="tech-pill-logo" data-tech-name={tech.name}>
                    <img 
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.devicon}/${tech.devicon}-${tech.usePlain ? 'plain' : 'original'}.svg`} 
                      alt={tech.name}
                      className="tech-icon"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.devicon}/${tech.devicon}-plain.svg`;
                      }}
                    />
                    <span className="tech-name">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="tech-carousel tech-carousel-reverse">
              <div className="tech-carousel-track">
                {[
                  {name: 'AWS', devicon: null, simple: 'amazon', color: 'FF9900'},
                  {name: 'Google Cloud', devicon: 'googlecloud', simple: 'googlecloud', color: '4285F4'},
                  {name: 'Azure', devicon: 'azure', simple: 'microsoftazure', color: '0078D4'},
                  {name: 'Docker', devicon: 'docker', simple: 'docker', color: '2496ED'},
                  {name: 'Kubernetes', devicon: 'kubernetes', simple: 'kubernetes', color: '326CE5'},
                  {name: 'Vercel', devicon: null, simple: 'vercel', color: '000000'},
                  {name: 'Netlify', devicon: null, simple: 'netlify', color: '00C7B7'},
                  {name: 'Heroku', devicon: 'heroku', simple: 'heroku', color: '430098'},
                  {name: 'DigitalOcean', devicon: 'digitalocean', simple: 'digitalocean', color: '0080FF'},
                  {name: 'Cloudflare', devicon: 'cloudflare', simple: 'cloudflare', color: 'F38020'},
                  {name: 'Firebase', devicon: 'firebase', simple: 'firebase', color: 'FFCA28'},
                  {name: 'Supabase', devicon: 'supabase', simple: 'supabase', color: '3ECF8E'},
                  {name: 'GitHub', devicon: 'github', simple: 'github', color: '181717'},
                  {name: 'GitLab', devicon: 'gitlab', simple: 'gitlab', color: 'FC6D26'},
                  {name: 'Bitbucket', devicon: 'bitbucket', simple: 'bitbucket', color: '0052CC'},
                  {name: 'Jenkins', devicon: 'jenkins', simple: 'jenkins', color: 'D24939'}
                ].map((tech, index) => (
                  <div key={index} className="tech-pill-logo tech-pill-cyan" data-tech-name={tech.name}>
                    <img 
                      src={tech.devicon 
                        ? `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.devicon}/${tech.devicon}-original.svg`
                        : `https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/${tech.simple}.svg`
                      }
                      alt={tech.name}
                      className="tech-icon"
                      onError={(e) => {
                        e.target.onerror = null;
                        if (tech.devicon) {
                          e.target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.devicon}/${tech.devicon}-plain.svg`;
                        }
                      }}
                    />
                    <span className="tech-name">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="tech-carousel">
              <div className="tech-carousel-track">
                {[
                  {name: 'Stripe', devicon: null, simple: 'stripe', color: '008CDD'},
                  {name: 'PayPal', devicon: null, simple: 'paypal', color: '00457C'},
                  {name: 'Slack', devicon: 'slack', simple: 'slack', color: '4A154B'},
                  {name: 'Trello', devicon: 'trello', simple: 'trello', color: '0052CC'},
                  {name: 'Jira', devicon: 'jira', simple: 'jira', color: '0052CC'},
                  {name: 'Figma', devicon: 'figma', simple: 'figma', color: 'F24E1E'},
                  {name: 'Sketch', devicon: 'sketch', simple: 'sketch', color: 'F7B500'},
                  {name: 'Tailwind', devicon: 'tailwindcss', simple: 'tailwindcss', color: '06B6D4'},
                  {name: 'Bootstrap', devicon: 'bootstrap', simple: 'bootstrap', color: '7952B3'},
                  {name: 'MUI', devicon: 'materialui', simple: 'mui', color: '007FFF'},
                  {name: 'GraphQL', devicon: 'graphql', simple: 'graphql', color: 'E10098', usePlain: true},
                  {name: 'Redux', devicon: 'redux', simple: 'redux', color: '764ABC'},
                  {name: 'Webpack', devicon: 'webpack', simple: 'webpack', color: '8DD6F9'},
                  {name: 'Vite', devicon: 'vitejs', simple: 'vite', color: '646CFF'},
                  {name: 'TypeScript', devicon: 'typescript', simple: 'typescript', color: '3178C6'},
                  {name: 'JavaScript', devicon: 'javascript', simple: 'javascript', color: 'F7DF1E'}
                ].map((tech, index) => (
                  <div key={index} className="tech-pill-logo tech-pill-purple" data-tech-name={tech.name}>
                    <img 
                      src={tech.devicon 
                        ? `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.devicon}/${tech.devicon}-original.svg`
                        : `https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/${tech.simple}.svg`
                      }
                      alt={tech.name}
                      className="tech-icon"
                      onError={(e) => {
                        e.target.onerror = null;
                        if (tech.devicon) {
                          e.target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.devicon}/${tech.devicon}-plain.svg`;
                        }
                      }}
                    />
                    <span className="tech-name">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: '50+', label: 'Proyectos Completados' },
              { number: '98%', label: 'Satisfaccion Cliente' },
              { number: '24/7', label: 'Soporte Disponible' },
              { number: '100%', label: 'Codigo Optimizado' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-black gradient-text mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
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