# AlmyWEB - Desarrollo Web Ecuador

![AlmyWEB](https://img.shields.io/badge/AlmyWEB-Tu%20Imagen%20Digital-6366f1?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)
![Responsive](https://img.shields.io/badge/Responsive-100%25-06b6d4?style=for-the-badge)

## 🚀 Descripción

**AlmyWEB** es un portafolio profesional de desarrollo web en Ecuador, diseñado para mostrar proyectos de alta calidad en arquitectura, salud, retail y más. El sitio combina React para la aplicación principal con páginas HTML estáticas para el portafolio, ofreciendo una experiencia de usuario excepcional.

### ✨ Características Principales

- 🎨 **Diseño Moderno**: Interfaz elegante con gradientes y animaciones suaves
- 📱 **100% Responsive**: Optimizado para todos los dispositivos (desktop, tablet, móvil)
- 🔍 **SEO Optimizado**: Configurado para "Desarrollo web ecuador" con 22+ menciones estratégicas
- ⚡ **Performance**: Carga rápida con compresión gzip y caché del navegador
- 🔒 **Seguro**: Protección de archivos sensibles y API con JWT
- 🎯 **6 Proyectos**: Portfolio completo con casos de uso reales

## 📂 Estructura del Proyecto

```
AlmyWEB/
├── index.html                      # Aplicación React principal
├── portfolio/                      # Portafolio HTML estático
│   ├── index.html                 # Página principal del portafolio
│   ├── arquitectura-moderna/      # Proyecto 1
│   ├── clinica-dental/            # Proyecto 2
│   ├── boutique-moda/             # Proyecto 3
│   ├── cocina-gourmet/            # Proyecto 4
│   ├── centro-medico/             # Proyecto 5
│   └── constructora-residencial/  # Proyecto 6
├── contacto/                       # Página de contacto estática
├── api/                           # API Backend (PHP)
│   ├── config.php                # Configuración
│   ├── handlers.php              # Manejadores de API
│   └── index.php                 # Punto de entrada
├── static/                        # Assets de React
│   ├── css/                      # Estilos compilados
│   └── js/                       # JavaScript compilado
├── imagenesportafolio/            # Imágenes de proyectos
├── .htaccess                      # Configuración Apache
├── robots.txt                     # SEO - Crawlers
└── sitemap.xml                    # SEO - Mapa del sitio
```

## 🛠️ Tecnologías

### Frontend
- **React** - Aplicación principal
- **HTML5/CSS3** - Portafolio estático
- **JavaScript ES6+** - Interactividad
- **Tailwind CSS** - Estilos utility-first
- **Animate.css** - Animaciones

### Backend
- **PHP** - API REST
- **Supabase** - Base de datos
- **JWT** - Autenticación

### DevOps
- **Apache** - Servidor web
- **Git** - Control de versiones
- **Hostinger** - Hosting

## 📱 Responsive Design

El sitio está optimizado para todos los dispositivos con breakpoints en:

- **1200px**: Desktop grande
- **992px**: Laptop
- **768px**: Tablet
- **480px**: Móvil
- **<480px**: Móvil pequeño

### Características Responsive
✅ Menú hamburguesa en móvil  
✅ Grids adaptables (4→2→1 columnas)  
✅ Tipografía fluida con `clamp()`  
✅ Botones full-width en móvil  
✅ Touch targets >44px  
✅ Sin scroll horizontal  

## 🔍 SEO Optimizado

### Keyword Principal: "Desarrollo web ecuador"

**Optimizaciones implementadas:**
- ✅ Title tags optimizados (3 páginas)
- ✅ Meta descriptions con keywords (6 menciones)
- ✅ Meta keywords estratégicas (9 menciones)
- ✅ Open Graph tags (2 menciones)
- ✅ Twitter cards (2 menciones)
- ✅ Canonical URLs
- ✅ Geo tags para Ecuador
- ✅ robots.txt configurado
- ✅ sitemap.xml actualizado

**Total: 22+ menciones estratégicas**

## 🚀 Instalación y Despliegue

### Requisitos Previos
- Servidor web (Apache/Nginx)
- PHP 7.4+
- Cuenta de Supabase (para API)

### Instalación Local

1. **Clonar el repositorio**
```bash
git clone https://github.com/alof2003-art/AlmyW.E.B.git
cd AlmyW.E.B
```

2. **Configurar servidor local**
```bash
# Si usas XAMPP, copia los archivos a htdocs/
# Si usas otro servidor, configura el document root
```

3. **Configurar API**
Edita `api/config.php`:
```php
define('SUPABASE_URL', 'tu-url-de-supabase');
define('SUPABASE_KEY', 'tu-key-de-supabase');
define('SECRET_KEY', 'tu-secret-key-segura');
```

4. **Abrir en navegador**
```
http://localhost/
```

### Despliegue en Hostinger

1. **Subir archivos**
   - Accede a hPanel → File Manager
   - Navega a `public_html/`
   - Sube todos los archivos del proyecto

2. **Configurar permisos**
   - Carpetas: `755`
   - Archivos: `644`
   - `.htaccess`: `644`

3. **Configurar API**
   - Edita `api/config.php` con tus credenciales

4. **Habilitar HTTPS**
   - Descomenta las últimas 2 líneas en `.htaccess`

5. **Verificar**
   - Visita tu dominio
   - Prueba navegación
   - Verifica responsive

## 🔒 Seguridad

### Archivos Protegidos
- `.env`, `.log`, `.sql` - Bloqueados
- `.md`, `.txt` - Bloqueados (excepto robots.txt)
- `.json` - Bloqueados (excepto asset-manifest.json)

### API Segura
- ✅ JWT con expiración (7 días)
- ✅ Contraseñas hasheadas
- ✅ Validación de entrada
- ✅ Protección contra SQL injection

### Configuración Apache
- ✅ Índices de directorios deshabilitados
- ✅ CORS configurado
- ✅ Compresión gzip
- ✅ Cache del navegador

## 📊 Proyectos del Portafolio

1. **Arquitectura Moderna** - Estudio arquitectónico minimalista
2. **Clínica Dental** - Sistema de citas online
3. **Boutique Moda** - E-commerce de moda femenina
4. **Cocina Gourmet** - Catálogo de cocinas premium
5. **Centro Médico** - Portal médico integral
6. **Constructora Residencial** - Proyectos residenciales de lujo

## 🎯 Navegación

El sitio utiliza un sistema híbrido:
- **React Router** para `/` y `/contacto`
- **HTML estático** para `/portfolio`
- **Script de navegación** para transiciones suaves entre React y HTML

## 📝 Licencia

© 2026 AlmyWEB - Todos los derechos reservados

## 👥 Autores

**AlmyWEB Team**
- Gabriel Jimenez
- Myrian Daquilema

## 📧 Contacto

- **Email**: info@almyweb.com
- **Ubicación**: Ecuador
- **GitHub**: [@alof2003-art](https://github.com/alof2003-art)

---

<div align="center">

**Desarrollo Web Ecuador - Tu Imagen Digital**

[![GitHub](https://img.shields.io/badge/GitHub-AlmyWEB-6366f1?style=flat&logo=github)](https://github.com/alof2003-art/AlmyW.E.B)
[![Website](https://img.shields.io/badge/Website-almyweb.com-06b6d4?style=flat&logo=google-chrome)](https://almyweb.com)

</div>
