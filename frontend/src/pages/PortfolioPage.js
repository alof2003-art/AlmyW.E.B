import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import Footer from '../components/Footer';

// Mapeo de proyectos a sus rutas y screenshots (imagenes hero de cada pagina)
const projectRoutes = {
  'Estudio Arquitectónico Moderno': {
    route: '/portfolio/arquitectura-moderna',
    screenshot: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800'
  },
  'Diseños Arquitectónicos López': {
    route: '/portfolio/arquitectura-urbanismo',
    screenshot: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800'
  },
  'Clínica Dental Sonrisa': {
    route: '/portfolio/clinica-dental',
    screenshot: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800'
  },
  'Centro Médico Vida Sana': {
    route: '/portfolio/centro-medico',
    screenshot: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800'
  },
  'Consultorio Dr. Ramírez': {
    route: '/portfolio/centro-clinico',
    screenshot: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800'
  },
  'Boutique Fashion Store': {
    route: '/portfolio/boutique-moda',
    screenshot: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800'
  },
  'ElectroHogar Store': {
    route: '/portfolio/retail-hogar',
    screenshot: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=800'
  }
};

// Obtener ruta del proyecto
const getProjectRoute = (project) => {
  const projectInfo = projectRoutes[project.title];
  return projectInfo ? projectInfo.route : null;
};

export const PortfolioPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch projects on mount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await api.get('/portfolio');
        // Actualizar imagenes con screenshots de las paginas reales
        const projectsWithScreenshots = response.data.map(project => {
          const projectInfo = projectRoutes[project.title];
          if (projectInfo) {
            return {
              ...project,
              image_url: projectInfo.screenshot,
              demo_url: projectInfo.route
            };
          }
          return project;
        });
        setProjects(projectsWithScreenshots);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    loadProjects();
  }, []);

  // Derive categories from projects
  const categories = useMemo(() => {
    return ['All', ...new Set(projects.map((p) => p.category))];
  }, [projects]);

  // Filter projects based on category and search term
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filtered;
  }, [projects, selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen pt-24" data-testid="portfolio-page">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="portfolio-title">
            Nuestro <span className="gradient-text">Portafolio</span>
          </h1>
          <p className="text-lg text-gray-600">Proyectos que hemos desarrollado para nuestros clientes</p>
        </motion.div>

        <div className="mb-12 space-y-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar proyectos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-[#0DB4B9] outline-none transition-colors glassmorphism"
              data-testid="portfolio-search"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3" data-testid="portfolio-filters">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[#0DB4B9] text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                data-testid={`filter-${category.toLowerCase()}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="portfolio-grid" data-testid="portfolio-grid">
          {filteredProjects.map((project, index) => {
            const projectRoute = getProjectRoute(project);
            const CardWrapper = projectRoute ? Link : 'div';
            const cardProps = projectRoute ? { to: projectRoute } : {};
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="portfolio-card-wrapper"
                data-testid={`portfolio-card-${index}`}
              >
                <CardWrapper
                  {...cardProps}
                  className="portfolio-card bg-white rounded-3xl shadow-lg overflow-hidden hover-lift group block cursor-pointer"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="portfolio-card-image"
                      data-testid={`portfolio-image-${index}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <div className="text-white w-full">
                        <h3 className="text-2xl font-bold mb-2" data-testid={`portfolio-title-${index}`}>
                          {project.title}
                        </h3>
                        {project.description && (
                          <p className="text-sm mb-3" data-testid={`portfolio-description-${index}`}>
                            {project.description}
                          </p>
                        )}
                        {projectRoute && (
                          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0DB4B9] bg-white/90 px-4 py-2 rounded-full">
                            <ExternalLink size={14} />
                            Ver Demo
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <span
                      className="inline-block px-4 py-1 bg-[#0DB4B9]/10 text-[#0DB4B9] rounded-full text-sm font-medium"
                      data-testid={`portfolio-category-${index}`}
                    >
                      {project.category}
                    </span>
                  </div>
                </CardWrapper>
              </motion.div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20" data-testid="portfolio-empty">
            <p className="text-gray-500 text-lg">No se encontraron proyectos</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default PortfolioPage;
