import React, { useState } from 'react';
import { ArrowLeft, Menu, X, Calendar, Award, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ClinicaDental = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const servicios = [
    { icon: '🦷', titulo: 'Limpieza Dental', desc: 'Higiene profesional con tecnologia ultrasonica' },
    { icon: '✨', titulo: 'Blanqueamiento', desc: 'Sonrisa mas blanca en una sola sesion' },
    { icon: '🔧', titulo: 'Ortodoncia', desc: 'Brackets invisibles y tratamientos modernos' },
    { icon: '💎', titulo: 'Implantes', desc: 'Soluciones permanentes de alta calidad' },
    { icon: '👨‍⚕️', titulo: 'Endodoncia', desc: 'Tratamiento de conductos sin dolor' },
    { icon: '😊', titulo: 'Estetica Dental', desc: 'Diseno de sonrisa personalizado' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/portfolio" className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 transition-colors">
              <ArrowLeft size={20} />
              <span className="font-bold text-xl">Clinica Sonrisa Perfecta</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#inicio" className="text-sm font-medium hover:text-cyan-600 transition-colors">Inicio</a>
              <a href="#servicios" className="text-sm font-medium hover:text-cyan-600 transition-colors">Servicios</a>
              <a href="#equipo" className="text-sm font-medium hover:text-cyan-600 transition-colors">Equipo</a>
              <a href="#contacto" className="bg-cyan-500 text-white py-2 px-6 rounded-full hover:bg-cyan-600 transition-colors">Agendar Cita</a>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="inicio" className="pt-16 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center py-20">
          <div>
            <div className="inline-block px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold mb-6">Tecnologia de Vanguardia</div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">Tu Sonrisa<br/>Perfecta Empieza Aqui</h1>
            <p className="text-xl text-gray-600 mb-8">Odontologia integral con los mas altos estandares de calidad y atencion personalizada</p>
            <div className="flex gap-4">
              <a href="#contacto" className="bg-cyan-500 text-white px-8 py-4 rounded-full font-bold hover:bg-cyan-600 transition-colors">Agendar Cita</a>
              <a href="#servicios" className="border-2 border-cyan-500 text-cyan-600 px-8 py-4 rounded-full font-bold hover:bg-cyan-50 transition-colors">Ver Servicios</a>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800" alt="Clinica" className="rounded-3xl shadow-2xl" />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
              <div className="flex items-center gap-4">
                <Calendar className="text-cyan-500" size={32} />
                <div>
                  <p className="text-2xl font-bold">500+</p>
                  <p className="text-sm text-gray-600">Pacientes Felices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Nuestros Servicios</h2>
            <p className="text-xl text-gray-600">Atencion dental completa para toda la familia</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {servicios.map((servicio, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className="text-5xl mb-4">{servicio.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{servicio.titulo}</h3>
                <p className="text-gray-600">{servicio.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por que elegirnos */}
      <section className="py-24 px-4 bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center">Por que elegirnos</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <Award className="mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold mb-3">20+ Anos</h3>
              <p className="text-cyan-100">De experiencia en odontologia</p>
            </div>
            <div className="text-center">
              <Calendar className="mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold mb-3">Horarios Flexibles</h3>
              <p className="text-cyan-100">Abierto sabados y domingos</p>
            </div>
            <div className="text-center">
              <Heart className="mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold mb-3">Atencion Personalizada</h3>
              <p className="text-cyan-100">Cada paciente es unico</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">Agenda tu Cita Hoy</h2>
          <p className="text-xl text-gray-600 mb-12">Estamos listos para darte la mejor atencion dental</p>
          <a href="tel:+593992286986" className="inline-block bg-cyan-500 text-white px-12 py-5 rounded-full text-lg font-bold hover:bg-cyan-600 transition-colors shadow-xl">Llamar Ahora: +593 99 228 6986</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Clinica Sonrisa Perfecta</h3>
          <p className="text-gray-400 mb-2">Riobamba, Ecuador</p>
          <p className="text-gray-400">2026 Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default ClinicaDental;