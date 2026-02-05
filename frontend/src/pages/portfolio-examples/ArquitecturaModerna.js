import React, { useState } from 'react';
import { ArrowLeft, Menu, X, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ArquitecturaModerna = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const servicios = [
    { titulo: 'Diseno Arquitectonico', desc: 'Proyectos residenciales y comerciales de vanguardia' },
    { titulo: 'Arquitectura Corporativa', desc: 'Espacios de trabajo que inspiran productividad' },
    { titulo: 'Remodelacion Integral', desc: 'Transformamos espacios existentes en obras maestras' },
    { titulo: 'Supervision de Obra', desc: 'Control total de calidad y tiempos de ejecucion' }
  ];

  const proyectos = [
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
    'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
    'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800',
    'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/portfolio" className="flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors">
              <ArrowLeft size={20} />
              <span className="font-bold text-xl">Estudio Lopez</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#inicio" className="text-sm font-medium hover:text-gray-600 transition-colors">Inicio</a>
              <a href="#servicios" className="text-sm font-medium hover:text-gray-600 transition-colors">Servicios</a>
              <a href="#galeria" className="text-sm font-medium hover:text-gray-600 transition-colors">Galeria</a>
              <a href="#contacto" className="btn-primary py-2 px-6">Contacto</a>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4">
            <div className="flex flex-col gap-4">
              <a href="#inicio" onClick={() => setMenuOpen(false)}>Inicio</a>
              <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
              <a href="#galeria" onClick={() => setMenuOpen(false)}>Galeria</a>
              <a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="inicio" className="pt-16 relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <img 
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920" 
            alt="Hero" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-black mb-6">Arquitectura<br/>que Inspira</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">Diseños minimalistas para espacios corporativos</p>
          <a href="#servicios" className="inline-block bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors">Ver Proyectos</a>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center">Nuestros Servicios</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {servicios.map((servicio, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-black rounded-full mb-4"></div>
                <h3 className="text-2xl font-bold mb-3">{servicio.titulo}</h3>
                <p className="text-gray-600">{servicio.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section id="galeria" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center">Proyectos Destacados</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {proyectos.map((img, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-2xl group cursor-pointer">
                <img src={img} alt={`Proyecto ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-24 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">Hagamos realidad tu proyecto</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8 mb-12">
            <div className="flex items-center justify-center gap-2">
              <Mail size={20} />
              <span>contacto@estudiolopez.com</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Phone size={20} />
              <span>+593 99 228 6986</span>
            </div>
          </div>
          <a href="mailto:contacto@estudiolopez.com" className="inline-block bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors">Solicitar Cotizacion</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 text-center">
        <p className="text-sm text-gray-400">2026 Estudio Lopez. Arquitectura Moderna. Riobamba, Ecuador</p>
      </footer>
    </div>
  );
};

export default ArquitecturaModerna;