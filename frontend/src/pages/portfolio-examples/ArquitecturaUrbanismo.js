import React, { useState } from 'react';
import { ArrowLeft, Menu, X, Building, Trees, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ArquitecturaUrbanismo = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const proyectos = [
    { titulo: 'Parque Central Metropolitano', tipo: 'Espacio Publico', img: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800' },
    { titulo: 'Complejo Residencial Verde', tipo: 'Vivienda Sostenible', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' },
    { titulo: 'Plaza Comercial Moderna', tipo: 'Uso Mixto', img: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/portfolio" className="flex items-center gap-2 text-green-700 hover:text-green-800">
              <ArrowLeft size={20} />
              <span className="font-bold text-xl">Urbanismo Sostenible</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#inicio" className="text-sm font-medium hover:text-green-700">Inicio</a>
              <a href="#proyectos" className="text-sm font-medium hover:text-green-700">Proyectos</a>
              <a href="#vision" className="text-sm font-medium hover:text-green-700">Vision</a>
              <a href="#contacto" className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700">Contactar</a>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden"><Menu size={24} /></button>
          </div>
        </div>
      </nav>

      <section id="inicio" className="pt-16 relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920" alt="Hero" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-teal-900/60"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <Trees size={20} />
            <span className="font-semibold">Diseno Urbano Sostenible</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none">CIUDADES<br/>DEL FUTURO</h1>
          <p className="text-2xl md:text-3xl mb-12 text-gray-200">Espacios urbanos que armonizan con el medio ambiente</p>
          <a href="#proyectos" className="inline-block bg-white text-green-800 px-12 py-5 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors shadow-2xl">Ver Proyectos</a>
        </div>
      </section>

      <section id="proyectos" className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-6 text-gray-900">Grandes Proyectos</h2>
            <p className="text-2xl text-gray-600">Transformando ciudades con vision sostenible</p>
          </div>
          <div className="space-y-24">
            {proyectos.map((proyecto, i) => (
              <div key={i} className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">{proyecto.tipo}</div>
                  <h3 className="text-4xl font-black mb-6 text-gray-900">{proyecto.titulo}</h3>
                  <p className="text-xl text-gray-600 mb-8">Integracion de espacios verdes, arquitectura moderna y movilidad sostenible para crear comunidades vibrantes y ecologicas.</p>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-3xl font-bold text-green-600">50Ha</p>
                      <p className="text-sm text-gray-500">Area Total</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-green-600">5K+</p>
                      <p className="text-sm text-gray-500">Usuarios</p>
                    </div>
                  </div>
                </div>
                <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                  <img src={proyecto.img} alt={proyecto.titulo} className="rounded-3xl shadow-2xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="vision" className="py-24 px-4 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <Building className="mx-auto mb-6" size={64} />
              <h3 className="text-3xl font-bold mb-4">Planificacion Integral</h3>
              <p className="text-green-100 text-lg">Diseños urbanos que consideran todos los aspectos de la vida comunitaria</p>
            </div>
            <div>
              <Trees className="mx-auto mb-6" size={64} />
              <h3 className="text-3xl font-bold mb-4">Sostenibilidad</h3>
              <p className="text-green-100 text-lg">Proyectos que respetan y mejoran el medio ambiente</p>
            </div>
            <div>
              <MapPin className="mx-auto mb-6" size={64} />
              <h3 className="text-3xl font-bold mb-4">Comunidad</h3>
              <p className="text-green-100 text-lg">Espacios que fomentan la conexion y calidad de vida</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-8 text-gray-900">Construyamos Juntos</h2>
          <p className="text-xl text-gray-600 mb-12">Consultoria en urbanismo y proyectos de gran escala</p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <a href="tel:+593992286986" className="bg-green-600 text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-green-700 transition-colors shadow-xl">+593 99 228 6986</a>
            <a href="mailto:contacto@urbanismosostenible.com" className="border-2 border-green-600 text-green-700 px-10 py-5 rounded-full text-lg font-bold hover:bg-green-50 transition-colors">Enviar Email</a>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4 text-center">
        <p className="text-gray-400">2026 Urbanismo Sostenible. Arquitectura y Planificacion. Ecuador</p>
      </footer>
    </div>
  );
};

export default ArquitecturaUrbanismo;