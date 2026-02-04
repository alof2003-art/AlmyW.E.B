import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Award, Phone, Mail, MapPin } from 'lucide-react';

export const ArchitectTemplate = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="animated-background"></div>
      
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10"></div>
        <div className="absolute inset-0" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920)', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
        <motion.div initial={{opacity: 0, y: 50}} animate={{opacity: 1, y: 0}} transition={{duration: 1}} className="relative z-20 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">Estudio Lopez</h1>
          <p className="text-2xl md:text-3xl text-gray-300">Arquitectura Moderna</p>
        </motion.div>
      </section>

      {/* Sobre Nosotros */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{opacity: 0, x: -50}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}}>
              <h2 className="text-5xl font-bold mb-6">Diseno que inspira</h2>
              <p className="text-lg text-gray-700 mb-4">Con mas de 15 anos de experiencia, transformamos espacios en obras de arte funcionales.</p>
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center"><Building2 className="mx-auto mb-2" size={32} /><p className="font-bold text-2xl">150+</p><p className="text-sm">Proyectos</p></div>
                <div className="text-center"><Award className="mx-auto mb-2" size={32} /><p className="font-bold text-2xl">25</p><p className="text-sm">Premios</p></div>
                <div className="text-center"><Users className="mx-auto mb-2" size={32} /><p className="font-bold text-2xl">200+</p><p className="text-sm">Clientes</p></div>
              </div>
            </motion.div>
            <motion.div initial={{opacity: 0, x: 50}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}}>
              <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800" alt="Architecture" className="rounded-2xl shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center">Proyectos Destacados</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1,2,3].map(i => (
              <motion.div key={i} initial={{opacity: 0, scale: 0.9}} whileInView={{opacity: 1, scale: 1}} viewport={{once: true}} transition={{delay: i*0.1}} className="group cursor-pointer">
                <div className="overflow-hidden rounded-2xl shadow-xl">
                  <img src={`https://images.unsplash.com/photo-${1600607687939+i*100000}-ce8a6c25118c?w=600`} alt={`Project ${i}`} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-2xl font-bold mt-4">Casa Moderna {i}</h3>
                <p className="text-gray-600">Residencial  2024</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="py-24 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Contactanos</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8 mb-8">
            <div className="flex items-center gap-2"><Phone /><span>+593 99 228 6986</span></div>
            <div className="flex items-center gap-2"><Mail /><span>contacto@arq-lopez.com</span></div>
            <div className="flex items-center gap-2"><MapPin /><span>Riobamba, Ecuador</span></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArchitectTemplate;