import React, { useState } from 'react';
import { ArrowLeft, Menu, X, ShoppingBag, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BoutiqueModa = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const colecciones = [
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800',
    'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800',
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800'
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/portfolio" className="flex items-center gap-2 text-white hover:text-yellow-400">
              <ArrowLeft size={20} />
              <span className="font-bold text-2xl tracking-wider">ÉLÉGANTE</span>
            </Link>
            <div className="hidden md:flex items-center gap-12">
              <a href="#inicio" className="text-sm font-medium hover:text-yellow-400 tracking-wide">INICIO</a>
              <a href="#coleccion" className="text-sm font-medium hover:text-yellow-400 tracking-wide">COLECCION</a>
              <a href="#estilo" className="text-sm font-medium hover:text-yellow-400 tracking-wide">ESTILO</a>
              <a href="#contacto" className="bg-yellow-400 text-black py-3 px-8 font-bold hover:bg-yellow-300">COMPRAR</a>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <section id="inicio" className="pt-20 relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1558769132-cb1aea67f98e?w=1920" alt="Hero" className="w-full h-full object-cover opacity-50" />
        </div>
        <div className="relative z-10 text-center px-4">
          <div className="inline-flex items-center gap-2 border border-yellow-400 text-yellow-400 px-6 py-2 mb-8">
            <Sparkles size={16} />
            <span className="text-sm font-semibold tracking-widest">NUEVA COLECCION 2026</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tighter">ALTA<br/>COSTURA</h1>
          <p className="text-2xl md:text-3xl mb-12 text-gray-300 font-light">Elegancia Atemporal</p>
          <a href="#coleccion" className="inline-block bg-yellow-400 text-black px-12 py-5 text-lg font-bold hover:bg-yellow-300 transition-colors">EXPLORAR COLECCION</a>
        </div>
      </section>

      <section id="coleccion" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">COLECCION</h2>
            <p className="text-xl text-gray-400">Piezas unicas para mujeres modernas</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {colecciones.map((img, i) => (
              <div key={i} className="group cursor-pointer overflow-hidden">
                <div className="aspect-[3/4] overflow-hidden mb-4">
                  <img src={img} alt={`Look ${i+1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <p className="text-sm tracking-widest text-gray-400">LOOK {i+1}</p>
                <p className="text-2xl font-bold">PRIMAVERA 2026</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="estilo" className="py-24 px-4 bg-yellow-400 text-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-6xl md:text-7xl font-black mb-8 tracking-tighter">TU ESTILO<br/>TU FIRMA</h2>
              <p className="text-xl mb-8 leading-relaxed">En Elegante creamos piezas que cuentan historias. Cada diseno es una declaracion de independencia, elegancia y poder femenino.</p>
              <a href="#contacto" className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-bold hover:bg-gray-900 transition-colors">
                <ShoppingBag size={20} />
                AGENDA TU CITA
              </a>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800" alt="Style" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-7xl font-black mb-8 tracking-tighter">VISITANOS</h2>
          <p className="text-xl text-gray-400 mb-12">Boutique Elegante - Riobamba Centro</p>
          <div className="space-y-4 text-lg">
            <p>Telefono: +593 99 228 6986</p>
            <p>Email: info@elegante-boutique.com</p>
          </div>
        </div>
      </section>

      <footer className="bg-black border-t border-white/10 py-12 px-4 text-center">
        <p className="text-sm text-gray-500 tracking-widest">2026 ELEGANTE. TODOS LOS DERECHOS RESERVADOS</p>
      </footer>
    </div>
  );
};

export default BoutiqueModa;