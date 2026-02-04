-- Script SQL para inicializar datos en Supabase
-- Ejecuta este script en tu SQL Editor de Supabase

-- 1. Insertar admin por defecto (usuario: admin, password: admin123)
INSERT INTO admins (id, username, password_hash) VALUES 
('admin-001', 'admin', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5QGjxj.WJgCGO');

-- 2. Insertar contenido del sitio
INSERT INTO site_content (id, hero_title, hero_slogan, hero_bg_url, logo_url, mission, vision) VALUES 
('content-001', 
 'Almy.W.E.B.', 
 'tu imagen digital',
 'https://images.unsplash.com/photo-1645395758741-c23bb12d9d6b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDR8MHwxfHNlYXJjaHwxfHxwdXJwbGUlMjBjaXJjdWl0JTIwYm9hcmQlMjB0ZWNobm9sb2d5JTIwbG9nbyUyMG1pbmltYWx8ZW58MHx8fHwxNzcwMjQ0MTI1fDA&ixlib=rb-4.1.0&q=85',
 'https://customer-assets.emergentagent.com/job_52a25063-feb1-4c4e-8b2d-471e0e6d35ca/artifacts/rdyuv2cc_image.png',
 'Empoderar a las empresas con soluciones digitales accesibles y de alta calidad. Creemos que cada negocio merece una presencia en línea profesional sin importar su tamaño o presupuesto.',
 'Ser el socio tecnológico líder para empresas emergentes en Ecuador, transformando ideas en experiencias digitales exitosas que impulsen el crecimiento de nuestros clientes.');

-- 3. Insertar servicios
INSERT INTO services (id, title, description, pages, features, price, renewal_price, is_featured, display_order) VALUES 
('service-001',
 'Web Presencial',
 'Ideal para dar a conocer la información detallada de su negocio.',
 'Hasta 5 secciones',
 'Hosting y Dominio|Optimización SEO básica',
 30.00,
 30.00,
 false,
 1),
('service-002',
 'Aplicativo Web (Gestión Pro)',
 'Para administrar su propio contenido sin depender de un desarrollador.',
 'Hasta 10 secciones',
 'Hosting, Dominio y Base de Datos (Supabase)|Panel de administración de información|Conexión estable y SEO incluido',
 65.00,
 30.00,
 true,
 2),
('service-003',
 'Aplicativo Web Premium',
 'Solución completa para negocios con funcionalidades complejas.',
 'Ilimitadas',
 'Hosting, Dominio y Base de Datos extendida (hasta 5GB)|Administración de usuarios y cuentas de clientes|SEO Avanzado y garantía de conexión',
 110.00,
 40.00,
 false,
 3);

-- 4. Insertar proyectos de portafolio
INSERT INTO portfolio_projects (id, title, category, description, image_url, demo_url) VALUES 
('project-001',
 'Estudio Arquitectónico Moderno',
 'Arquitectura',
 'Sitio web minimalista para estudio de arquitectura con galería de proyectos',
 'https://images.unsplash.com/photo-1763819833135-d8e273798277?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsJTIwYXJjaGl0ZWN0dXJlJTIwd2Vic2l0ZSUyMGRlc2lnbiUyMG1vY2t1cHN8ZW58MHx8fHwxNzcwMjQ0MTM3fDA&ixlib=rb-4.1.0&q=85',
 '#'),
('project-002',
 'Clínica Dental Sonrisa',
 'Salud',
 'Portal web para clínica dental con sistema de citas online',
 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NjV8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBkZW50YWwlMjBjbGluaWMlMjB3ZWJzaXRlJTIwZGVzaWduJTIwbW9ja3Vwc3xlbnwwfHx8fDE3NzAyNDQxMzh8MA&ixlib=rb-4.1.0&q=85',
 '#'),
('project-003',
 'Centro Médico Vida Sana',
 'Salud',
 'Plataforma integral para centro médico con múltiples especialidades',
 'https://images.unsplash.com/photo-1642975967602-653d378f3b5b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHw0fHxtZWRpY2FsJTIwY2xpbmljJTIwZG9jdG9yJTIwd2Vic2l0ZSUyMGRlc2lnbiUyMG1vY2t1cHN8ZW58MHx8fHwxNzcwMjQ0MTM5fDA&ixlib=rb-4.1.0&q=85',
 '#'),
('project-004',
 'Boutique Fashion Store',
 'Retail',
 'E-commerce moderno para tienda de ropa con catálogo digital',
 'https://images.unsplash.com/photo-1629935226757-6e22f6ef9ac1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBlY29tbWVyY2UlMjB3ZWJzaXRlJTIwZGVzaWduJTIwbW9ja3Vwc3xlbnwwfHx8fDE3NzAyNDQxNDB8MA&ixlib=rb-4.1.0&q=85',
 '#'),
('project-005',
 'ElectroHogar Store',
 'Retail',
 'Tienda online de electrodomésticos con comparador de productos',
 'https://images.unsplash.com/photo-1696814543707-1bdce2a5d48e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwzfHxob21lJTIwYXBwbGlhbmNlJTIwc3RvcmUlMjB3ZWJzaXRlJTIwZGVzaWduJTIwbW9ja3Vwc3xlbnwwfHx8fDE3NzAyNDQxNDB8MA&ixlib=rb-4.1.0&q=85',
 '#'),
('project-006',
 'Consultorio Dr. Ramírez',
 'Salud',
 'Sitio web profesional para médico general con información de servicios',
 'https://images.unsplash.com/photo-1642975967602-653d378f3b5b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHw0fHxtZWRpY2FsJTIwY2xpbmljJTIwZG9jdG9yJTIwd2Vic2l0ZSUyMGRlc2lnbiUyMG1vY2t1cHN8ZW58MHx8fHwxNzcwMjQ0MTM5fDA&ixlib=rb-4.1.0&q=85',
 '#'),
('project-007',
 'Diseños Arquitectónicos López',
 'Arquitectura',
 'Portfolio digital para arquitecto independiente con casos de estudio',
 'https://images.unsplash.com/photo-1763819833135-d8e273798277?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsJTIwYXJjaGl0ZWN0dXJlJTIwd2Vic2l0ZSUyMGRlc2lnbiUyMG1vY2t1cHN8ZW58MHx8fHwxNzcwMjQ0MTM3fDA&ixlib=rb-4.1.0&q=85',
 '#');

-- 5. Insertar testimonios
INSERT INTO testimonials (id, name, company, content, rating, avatar_url, display_order) VALUES 
('testimonial-001',
 'María González',
 'Boutique Luna',
 'Excelente servicio, nuestra página web ha aumentado nuestras ventas en un 40%. El equipo de Almy.W.E.B. entendió perfectamente nuestra visión.',
 5,
 'https://images.unsplash.com/photo-1599132880549-bffe2907f808?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBkaXZlcnNpdHklMjBidXNpbmVzcyUyMHBvcnRyYWl0cyUyMGZvciUyMHRlc3RpbW9uaWFsc3xlbnwwfHx8fDE3NzAyNDQxNDF8MA&ixlib=rb-4.1.0&q=85',
 1),
('testimonial-002',
 'Dr. Carlos Mendoza',
 'Centro Médico Vida',
 'Profesionales y puntuales. Ahora mis pacientes pueden agendar citas online fácilmente. Lo recomiendo totalmente.',
 5,
 'https://images.unsplash.com/photo-1686628332798-757c624c4b08?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkaXZlcnNpdHklMjBidXNpbmVzcyUyMHBvcnRyYWl0cyUyMGZvciUyMHRlc3RpbW9uaWFsc3xlbnwwfHx8fDE3NzAyNDQxNDF8MA&ixlib=rb-4.1.0&q=85',
 2),
('testimonial-003',
 'Arq. Ana Pérez',
 'Estudio AP Arquitectos',
 'La mejor inversión para mi estudio. El diseño es elegante y mis clientes quedan impresionados con el portfolio digital.',
 5,
 'https://images.unsplash.com/photo-1760320483844-3d808de62def?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBkaXZlcnNpdHklMjBidXNpbmVzcyUyMHBvcnRyYWl0cyUyMGZvciUyMHRlc3RpbW9uaWFsc3xlbnwwfHx8fDE3NzAyNDQxNDF8MA&ixlib=rb-4.1.0&q=85',
 3);

-- 6. Insertar enlaces de redes sociales
INSERT INTO social_links (id, platform, url, icon_name, display_order) VALUES 
('social-001', 'Facebook', 'https://facebook.com', 'Facebook', 1),
('social-002', 'Instagram', 'https://instagram.com', 'Instagram', 2),
('social-003', 'WhatsApp', 'https://wa.me/593992286986', 'MessageCircle', 3);

-- 7. Insertar configuración del footer
INSERT INTO footer_config (id, location_name, location_address, map_lat, map_lng, copyright_text, show_authors, authors) VALUES 
('footer-001',
 'ESPOCH, Riobamba',
 'Escuela Superior Politécnica de Chimborazo, Riobamba, Chimborazo, Ecuador',
 '-1.6544',
 '-78.6795',
 'desarrollado por AlmyW.E.B.',
 false,
 'Gabriel Jimenez|Myrian Daquilema');

-- Verificar los datos insertados
SELECT 'Admins' as tabla, COUNT(*) as registros FROM admins
UNION ALL
SELECT 'Site Content', COUNT(*) FROM site_content
UNION ALL
SELECT 'Services', COUNT(*) FROM services
UNION ALL
SELECT 'Portfolio Projects', COUNT(*) FROM portfolio_projects
UNION ALL
SELECT 'Testimonials', COUNT(*) FROM testimonials
UNION ALL
SELECT 'Social Links', COUNT(*) FROM social_links
UNION ALL
SELECT 'Footer Config', COUNT(*) FROM footer_config;
