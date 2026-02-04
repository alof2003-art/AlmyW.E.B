import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, Award, Calendar } from 'lucide-react';

export const DentistTemplate = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center bg-gradient-to-r from-cyan-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{opacity: 0, x: -50}} animate={{opacity: 1, x: 0}}>
            <h1 className="text-6xl font-bold text-gray-900 mb-6">Sonrisa Perfecta</h1>
            <p className="text-xl text-gray-700 mb-8">Tu salud dental en manos expertas. Tecnologia de vanguardia y atencion personalizada.</p>
            <button className="bg-cyan-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-cyan-600 transition">Agendar Cita</button>
          </motion.div>
          <motion.div initial={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1}} transition={{delay: 0.3}}>
            <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800" alt="Dentist" className="rounded-3xl shadow-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Nuestros Servicios</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {['Limpieza Dental', 'Ortodoncia', 'Implantes', 'Blanqueamiento'].map((service, i) => (
              <motion.div key={i} initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{delay: i*0.1}} className="bg-gradient-to-br from-cyan-50 to-white p-8 rounded-2xl text-center hover:shadow-2xl transition">
                <div className="w-16 h-16 bg-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center"><Heart className="text-white" /></div>
                <h3 className="text-xl font-bold mb-2">{service}</h3>
                <p className="text-gray-600 text-sm">Tecnologia avanzada</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Por que elegirnos */}
      <section className="py-20 px-4 bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Por que elegirnos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[{icon: Clock, title: 'Horarios Flexibles', desc: 'Abierto sabados'}, {icon: Award, title: '20+ Anos', desc: 'De experiencia'}, {icon: Calendar, title: 'Agenda Online', desc: 'Sistema 24/7'}].map((item, i) => (
              <motion.div key={i} initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} className="text-center">
                <item.icon className="mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-cyan-100">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-12 px-4 bg-gray-900 text-white text-center">
        <p className="text-lg">Clinica Sonrisa Perfecta - Riobamba, Ecuador</p>
        <p className="text-gray-400 mt-2">Telefono: +593 99 228 6986</p>
      </section>
    </div>
  );
};

export default DentistTemplate;