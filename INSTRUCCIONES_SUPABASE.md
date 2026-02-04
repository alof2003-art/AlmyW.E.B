# Almy.W.E.B. - Configuración de Base de Datos

## Pasos para inicializar la base de datos en Supabase

### 1. Accede a tu proyecto de Supabase
- Ve a https://supabase.com/dashboard
- Selecciona tu proyecto

### 2. Ejecuta el script SQL
1. En el menú lateral, haz clic en **"SQL Editor"**
2. Haz clic en **"New Query"**
3. Copia y pega el contenido completo del archivo `/app/backend/seed_data.sql`
4. Haz clic en **"Run"** para ejecutar el script

### 3. Verifica la instalación
Al final del script verás una tabla que muestra cuántos registros se insertaron en cada tabla:

```
tabla                 | registros
----------------------|----------
Admins               | 1
Site Content         | 1
Services             | 3
Portfolio Projects   | 7
Testimonials         | 3
Social Links         | 3
Footer Config        | 1
```

## Credenciales de Acceso al Panel de Admin

Una vez ejecutado el script SQL, podrás acceder al panel de administración con:

**URL:** http://tu-app-url/admin/login

**Usuario:** `admin`
**Contraseña:** `admin123`

⚠️ **IMPORTANTE:** Cambia la contraseña después del primer inicio de sesión.

## Estructura de las Tablas

### 1. **admins**
Usuarios administradores del sistema.

### 2. **site_content**
Contenido del Hero section, misión y visión.

### 3. **services**
Los tres paquetes de servicios ofrecidos ($30, $65, $110).

### 4. **portfolio_projects**
7 proyectos de ejemplo en el portafolio.

### 5. **testimonials**
Reseñas de clientes.

### 6. **social_links**
Enlaces a redes sociales (Facebook, Instagram, WhatsApp).

### 7. **footer_config**
Configuración del footer (ubicación, copyright, autores).

## Características del Sitio

### Páginas Públicas
- **Inicio:** Hero con logo flotante, servicios, misión/visión, testimonios
- **Portafolio:** 7 proyectos con filtros por categoría y búsqueda
- **Contacto:** Formulario que envía mensaje a WhatsApp (+593 992286986)

### Panel de Administración
- **Contenido:** Editar título, slogan, logo, misión y visión
- **Servicios:** CRUD completo de servicios/paquetes
- **Portafolio:** Agregar, editar y eliminar proyectos
- **Testimonios:** Gestionar reseñas de clientes
- **Footer:** Configurar ubicación, redes sociales y autores

### Características Especiales
- ✨ Partículas doradas en el servicio destacado (plan de $65)
- 🎨 Animaciones suaves y modernas
- 📱 Diseño 100% responsivo
- 🔐 Autenticación JWT para el panel admin
- 🗄️ Base de datos PostgreSQL en Supabase
- 🌐 Integración con WhatsApp para contacto

## Soporte

Si tienes problemas con la configuración:
1. Verifica que copiaste el script SQL completo
2. Asegúrate de ejecutarlo en el SQL Editor de Supabase
3. Revisa que las migraciones de Alembic se aplicaron correctamente

## Personalización

Una vez que el sitio esté funcionando, puedes personalizar:
- Imágenes (logo, hero background, proyectos)
- Textos (misión, visión, descripciones)
- Precios de servicios
- Información de contacto
- Redes sociales

Todo esto se puede hacer desde el panel de administración sin necesidad de tocar código.

---

**Desarrollado por Almy.W.E.B.**
*tu imagen digital*