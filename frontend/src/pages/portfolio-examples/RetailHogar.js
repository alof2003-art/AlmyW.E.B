import React, { useState } from 'react';
import { ArrowLeft, Menu, X, Home, Palette, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

export const RetailHogar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const ambientes = [
    { titulo: 'Cocina Moderna', img: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800' },
    { titulo: 'Sala Contemporanea', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800' },
    { titulo: 'Comedor Elegante', img: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=800' },
    { titulo: 'Dormitorio Principal', img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/portfolio" className="flex items-center gap-2 text-orange-600 hover:text-orange-700">
              <ArrowLeft size={20} />
              <span className="font-bold text-xl">Casa & Estilo</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#inicio" className="text-sm font-medium hover:text-orange-600">Inicio</a>
              <a href="#catalogo" className="text-sm font-medium hover:text-orange-600">Catalogo</a>
              <a href="#ambientes" className="text-sm font-medium hover:text-orange-600">Ambientes</a>
              <a href="#contacto" className="bg-orange-500 text-white py-2 px-6 rounded-full hover:bg-orange-600">Visitar Showroom</a>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden"><Menu size={24} /></button>
          </div>
        </div>
      </nav>

      <section id="inicio" className="pt-16 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-6">
              <Home size={16} />
              <span className="text-sm font-semibold">Diseno de Interiores Premium</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-gray-900">Transforma tu Hogar</h1>
            <p className="text-xl text-gray-600 mb-8">Muebles y decoracion de alta calidad para crear el espacio de tus suenos. Diseno, comodidad y funcionalidad.</p>
            <div className="flex gap-4">
              <a href="#catalogo" className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition-colors shadow-lg">Ver Catalogo</a>
              <a href="#contacto" className="border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-full font-bold hover:bg-orange-50 transition-colors">Agendar Visita</a>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=800" alt="Living Room" className="rounded-3xl shadow-2xl" />
          </div>
        </div>
      </section>

      <section id="catalogo" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-center">Catalogo Premium</h2>
          <p className="text-xl text-gray-600 text-center mb-16">Explora nuestra seleccion de muebles y accesorios</p>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Palette className="text-orange-500" size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Cocinas</h3>
              <p className="text-gray-600">Disenos modernos con materiales de primera calidad</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Home className="text-orange-500" size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Salas</h3>
              <p className="text-gray-600">Confort y estilo para tu espacio social</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="text-orange-500" size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Iluminacion</h3>
              <p className="text-gray-600">Crea la atmosfera perfecta</p>
            </div>
          </div>
        </div>
      </section>

      <section id="ambientes" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center">Ambientes Inspiradores</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {ambientes.map((amb, i) => (
              <div key={i} className="group cursor-pointer overflow-hidden rounded-3xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={amb.img} alt={amb.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                    <h3 className="text-3xl font-bold text-white">{amb.titulo}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="py-24 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">Visitanos en Nuestro Showroom</h2>
          <p className="text-xl mb-12 text-orange-100">Experimenta la calidad de nuestros productos en persona</p>
          <a href="tel:+593992286986" className="inline-block bg-white text-orange-600 px-12 py-5 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors shadow-xl">+593 99 228 6986</a>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4 text-center">
        <p className="text-gray-400">2026 Casa & Estilo. Muebles Premium. Riobamba, Ecuador</p>
      </footer>
    </div>
  );
};

export default RetailHogar;