/* ============================================================
   DATA_MAPPING.JS - Static Database (JSON in JS)
   Casa & Estilo v2.0
   ============================================================ */

const CasaEstiloData = {
    // ============================================================
    // COLLECTIONS
    // ============================================================
    collections: {
        cocinas: {
            id: 'cocinas',
            name: 'Cocinas Modulares',
            slug: 'cocinas',
            description: 'Diseño técnico con materiales de especificación arquitectónica',
            image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=90',
            products: [
                {
                    id: 'cocina-01',
                    name: 'Sistema Modular Premium',
                    price: 2500,
                    description: 'Roble europeo, acero inoxidable y superficies de cuarzo',
                    materials: ['Roble Europeo', 'Acero Inoxidable', 'Cuarzo Engineered'],
                    dimensions: '3.6m x 2.4m x 2.7m',
                    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=90',
                    gallery: [
                        'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=90',
                        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=90',
                        'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&q=90'
                    ]
                },
                {
                    id: 'cocina-02',
                    name: 'Cocina Minimalista Integral',
                    price: 3200,
                    description: 'Diseño sin tiradores con sistema push-to-open',
                    materials: ['Nogal Macizo', 'Mármol Carrara', 'Latón Cepillado'],
                    dimensions: '4.2m x 2.8m x 2.7m',
                    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=90',
                    gallery: []
                }
            ]
        },
        salas: {
            id: 'salas',
            name: 'Salas de Estar',
            slug: 'salas',
            description: 'Geometría pura y texturas naturales para espacios de convivencia',
            image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=90',
            products: [
                {
                    id: 'sala-01',
                    name: 'Conjunto Arquitectónico',
                    price: 1800,
                    description: 'Lino belga, estructura de nogal macizo y detalles en latón',
                    materials: ['Lino Belga', 'Nogal Macizo', 'Latón Cepillado'],
                    dimensions: 'Sofá: 2.4m x 0.9m x 0.8m',
                    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=90',
                    gallery: []
                },
                {
                    id: 'sala-02',
                    name: 'Sistema Modular de Asientos',
                    price: 2400,
                    description: 'Configuración flexible con módulos independientes',
                    materials: ['Cuero Italiano', 'Acero Cromado', 'Espuma HR'],
                    dimensions: 'Módulo: 0.9m x 0.9m x 0.75m',
                    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=90',
                    gallery: []
                }
            ]
        },
        dormitorios: {
            id: 'dormitorios',
            name: 'Dormitorios',
            slug: 'dormitorios',
            description: 'Diseño centrado en el bienestar y arquitectura del sueño',
            image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=90',
            products: [
                {
                    id: 'dormitorio-01',
                    name: 'Espacio de Descanso Integral',
                    price: 1200,
                    description: 'Maderas certificadas FSC y textiles orgánicos',
                    materials: ['Roble FSC', 'Lino Orgánico', 'Acabados sin VOC'],
                    dimensions: 'Cama: 2.0m x 1.6m x 1.2m',
                    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=90',
                    gallery: []
                },
                {
                    id: 'dormitorio-02',
                    name: 'Suite Minimalista',
                    price: 2800,
                    description: 'Sistema completo con vestidor integrado',
                    materials: ['Fresno Natural', 'Vidrio Templado', 'Aluminio Anodizado'],
                    dimensions: 'Sistema completo: 4.5m x 3.2m x 2.7m',
                    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=90',
                    gallery: []
                }
            ]
        },
        oficinas: {
            id: 'oficinas',
            name: 'Oficinas',
            slug: 'oficinas',
            description: 'Ergonomía y estética en equilibrio para espacios de trabajo',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=90',
            products: [
                {
                    id: 'oficina-01',
                    name: 'Estudio Profesional',
                    price: 980,
                    description: 'Diseño funcional para espacios de trabajo contemporáneos',
                    materials: ['MDF Lacado', 'Acero Estructural', 'Vidrio Templado'],
                    dimensions: 'Escritorio: 1.8m x 0.8m x 0.75m',
                    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=90',
                    gallery: []
                },
                {
                    id: 'oficina-02',
                    name: 'Sistema de Almacenamiento',
                    price: 1450,
                    description: 'Biblioteca modular con sistema de rieles',
                    materials: ['Nogal Americano', 'Acero Negro', 'Vidrio Ahumado'],
                    dimensions: '3.0m x 0.4m x 2.4m',
                    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=90',
                    gallery: []
                }
            ]
        }
    },

    // ============================================================
    // SERVICES
    // ============================================================
    services: [
        {
            id: 'diseno',
            name: 'Diseño Arquitectónico',
            description: 'Planificación espacial basada en principios de diseño universal',
            icon: 'grid'
        },
        {
            id: 'instalacion',
            name: 'Instalación Técnica',
            description: 'Equipo especializado certificado en instalación profesional',
            icon: 'clock'
        },
        {
            id: 'garantia',
            name: 'Garantía Extendida',
            description: '5 años de cobertura integral con mantenimiento preventivo',
            icon: 'layers'
        }
    ],

    // ============================================================
    // PROJECTS (Portfolio)
    // ============================================================
    projects: [
        {
            id: 'proyecto-01',
            name: 'Residencia Minimalista',
            category: 'Residencial',
            year: 2025,
            location: 'Quito, Ecuador',
            description: 'Proyecto integral de 280m² con enfoque en reducción formal',
            image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=90',
            gallery: []
        },
        {
            id: 'proyecto-02',
            name: 'Oficina Corporativa',
            category: 'Comercial',
            year: 2025,
            location: 'Guayaquil, Ecuador',
            description: 'Espacio de trabajo para 50 personas con diseño flexible',
            image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=90',
            gallery: []
        }
    ],

    // ============================================================
    // HELPER FUNCTIONS
    // ============================================================
    getCollectionBySlug(slug) {
        return Object.values(this.collections).find(c => c.slug === slug);
    },

    getProductById(productId) {
        for (let collection of Object.values(this.collections)) {
            const product = collection.products.find(p => p.id === productId);
            if (product) return product;
        }
        return null;
    },

    getAllProducts() {
        return Object.values(this.collections).flatMap(c => c.products);
    },

    filterProductsByPrice(minPrice, maxPrice) {
        return this.getAllProducts().filter(p => p.price >= minPrice && p.price <= maxPrice);
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CasaEstiloData;
}
