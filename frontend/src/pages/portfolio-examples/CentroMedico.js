import React, { useState } from 'react';
import { ArrowLeft, Menu, X, Heart, Clock, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CentroMedico = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const servicios = [
    { titulo: 'Consulta General', desc: 'Atencion medica integral para toda la familia', icon: '👨‍⚕️' },
    { titulo: 'Medicina Interna', desc: 'Diagnostico y tratamiento de enfermedades complejas', icon: '🩺' },
    { titulo: 'Cardiologia', desc: 'Cuidado especializado del corazon', icon: '❤️' },
    { titulo: 'Pediatria', desc: 'Atencion especializada para ninos', icon: '👶' },
    { titulo: 'Ginecologia', desc: 'Salud integral de la mujer', icon: '🌸' },
    { titulo: 'Dermatologia', desc: 'Cuidado profesional de la piel', icon: '✨' }
  ];

  const testimonios = [
    { nombre: 'Maria Rodriguez', texto: 'Excelente atencion, me senti muy bien cuidada', rating: 5 },
    { nombre: 'Carlos Mendez', texto: 'Profesionales muy capacitados y amables', rating: 5 },
    { nombre: 'Ana Torres', texto: 'El mejor centro medico de la ciudad', rating: 5 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/portfolio" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <ArrowLeft size={20} />
              <span className="font-bold text-xl">Centro Medico Vida Sana</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#inicio" className="text-sm font-medium hover:text-blue-600">Inicio</a>
              <a href="#servicios" className="text-sm font-medium hover:text-blue-600">Servicios</a>
              <a href="#testimonios" className="text-sm font-medium hover:text-blue-600">Testimonios</a>
              <a href="#contacto" className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600">Agendar</a>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <section id="inicio" className="pt-16 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full mb-6">
                <Heart size={16} />
                <span className="text-sm font-semibold">Atencion Humana y Profesional</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black mb-6 text-gray-900 leading-tight">Tu Salud es Nuestra Prioridad</h1>
              <p className="text-xl text-gray-600 mb-8">Consulta medica privada con especialistas certificados. Tecnologia avanzada y trato personalizado.</p>
              <div className="flex gap-4">
                <a href="#contacto" className="bg-blue-500 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-600 transition-colors shadow-lg">Agendar Consulta</a>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div>
                  <Clock className="text-blue-500 mb-2" size={32} />
                  <p className="text-2xl font-bold">24/7</p>
                  <p className="text-sm text-gray-600">Atencion</p>
                </div>
                <div>
                  <Users className="text-blue-500 mb-2" size={32} />
                  <p className="text-2xl font-bold">15+</p>
                  <p className="text-sm text-gray-600">Especialistas</p>
                </div>
                <div>
                  <Star className="text-blue-500 mb-2" size={32} />
                  <p className="text-2xl font-bold">4.9</p>
                  <p className="text-sm text-gray-600">Rating</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800" alt="Doctor" className="rounded-3xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-center">Especialidades Medicas</h2>
          <p className="text-xl text-gray-600 text-center mb-16">Atencion integral para tu bienestar</p>
          <div className="grid md:grid-cols-3 gap-8">
            {servicios.map((servicio, i) => (
              <div key={i} className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-blue-100">
                <div className="text-5xl mb-4">{servicio.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{servicio.titulo}</h3>
                <p className="text-gray-600">{servicio.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonios" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center">Lo Que Dicen Nuestros Pacientes</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonios.map((test, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-lg">
                <div className="flex mb-4">
                  {[...Array(test.rating)].map((_, j) => <Star key={j} className="fill-yellow-400 text-yellow-400" size={20} />)}
                </div>
                <p className="text-gray-600 italic mb-4">"{test.texto}"</p>
                <p className="font-bold">{test.nombre}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="py-24 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">Agenda tu Consulta</h2>
          <p className="text-xl mb-12 text-blue-100">Estamos aqui para cuidar de ti</p>
          <a href="tel:+593992286986" className="inline-block bg-white text-blue-600 px-12 py-5 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors shadow-xl">+593 99 228 6986</a>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4 text-center">
        <p className="text-gray-400">2026 Centro Medico Vida Sana. Riobamba, Ecuador</p>
      </footer>
    </div>
  );
};

export default CentroMedico;