import React, { useState } from 'react';
import { ArrowLeft, Menu, X, Activity, FileText, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CentroClinico = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const servicios = [
    { icon: Activity, titulo: 'Laboratorio Clinico', desc: 'Examenes de sangre, orina y mas' },
    { icon: FileText, titulo: 'Imagenologia', desc: 'Rayos X, ecografias, tomografias' },
    { icon: Shield, titulo: 'Medicina Ocupacional', desc: 'Examenes pre-empleo y anuales' },
    { icon: Clock, titulo: 'Urgencias 24/7', desc: 'Atencion medica las 24 horas' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/portfolio" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <ArrowLeft size={20} />
              <span className="font-bold text-xl">Centro Clinico Diagnostico</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#inicio" className="text-sm font-medium hover:text-blue-600">Inicio</a>
              <a href="#servicios" className="text-sm font-medium hover:text-blue-600">Servicios</a>
              <a href="#tecnologia" className="text-sm font-medium hover:text-blue-600">Tecnologia</a>
              <a href="#contacto" className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">Agendar Examen</a>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden"><Menu size={24} /></button>
          </div>
        </div>
      </nav>

      <section id="inicio" className="pt-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-md mb-6">
                <Shield size={16} />
                <span className="text-sm font-semibold">Certificado ISO 9001</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black mb-6">Diagnosticos Precisos y Confiables</h1>
              <p className="text-xl mb-8 text-blue-100">Laboratorio clinico y centro de imagenologia con tecnologia de ultima generacion. Resultados rapidos y precisos.</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <p className="text-3xl font-bold">10K+</p>
                  <p className="text-blue-200">Examenes al mes</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <p className="text-3xl font-bold">99.8%</p>
                  <p className="text-blue-200">Precision</p>
                </div>
              </div>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800" alt="Lab" className="rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-center">Servicios Clinicos</h2>
          <p className="text-xl text-gray-600 text-center mb-16">Diagnosticos completos y confiables</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicios.map((servicio, i) => {
              const IconComponent = servicio.icon;
              return (
                <div key={i} className="bg-white border-2 border-gray-100 p-8 rounded-2xl hover:border-blue-500 hover:shadow-xl transition-all">
                  <IconComponent className="text-blue-600 mb-4" size={48} />
                  <h3 className="text-xl font-bold mb-3">{servicio.titulo}</h3>
                  <p className="text-gray-600">{servicio.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="tecnologia" className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">Tecnologia de Vanguardia</h2>
              <p className="text-xl text-gray-600 mb-8">Equipos de ultima generacion para diagnosticos precisos y resultados en el menor tiempo posible.</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex-shrink-0 mt-1"></div>
                  <div><p className="font-bold">Laboratorio Automatizado</p><p className="text-gray-600">Procesamiento rapido de muestras</p></div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex-shrink-0 mt-1"></div>
                  <div><p className="font-bold">Tomografia Computarizada</p><p className="text-gray-600">Imagenes de alta resolucion</p></div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex-shrink-0 mt-1"></div>
                  <div><p className="font-bold">Ecografia 4D</p><p className="text-gray-600">Tecnologia de punta en ultrasonido</p></div>
                </li>
              </ul>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=800" alt="Tech" className="rounded-2xl shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="py-24 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">Agenda tu Examen</h2>
          <p className="text-xl mb-12 text-blue-100">Atencion sin citas o agenda con anticipacion</p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <a href="tel:+593992286986" className="bg-white text-blue-600 px-8 py-4 rounded-md font-bold hover:bg-gray-100 transition-colors">Llamar: +593 99 228 6986</a>
            <a href="mailto:info@clinicadiagnostico.com" className="border-2 border-white px-8 py-4 rounded-md font-bold hover:bg-white/10 transition-colors">Enviar Email</a>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4 text-center">
        <p className="text-gray-400">2026 Centro Clinico Diagnostico. Riobamba, Ecuador</p>
      </footer>
    </div>
  );
};

export default CentroClinico;