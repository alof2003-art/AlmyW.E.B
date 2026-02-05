# 🚀 Guía Completa de Despliegue - Almy.W.E.B.

## Arquitectura del Despliegue

```
┌─────────────────────────────────────────────────────────┐
│                    TU DOMINIO                           │
│              (ejemplo: almyweb.com)                     │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│           HOSTINGER BUSINESS (Frontend)                 │
│         React Build (archivos estáticos)                │
│              public_html/                               │
└─────────────────────────────────────────────────────────┘
                     │
                     │ API Calls
                     ▼
┌─────────────────────────────────────────────────────────┐
│         RAILWAY.APP (Backend - GRATIS)                  │
│         FastAPI + Python + Uvicorn                      │
│    URL: https://tu-app.railway.app                      │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Database Queries
                     ▼
┌─────────────────────────────────────────────────────────┐
│              SUPABASE (Base de Datos)                   │
│         PostgreSQL + API REST                           │
└─────────────────────────────────────────────────────────┘
```

---

## PARTE 1: Preparar el Backend en Railway (15 minutos)

### Paso 1.1: Crear cuenta en Railway
1. Ve a https://railway.app
2. Haz clic en "Start a New Project"
3. Inicia sesión con GitHub (recomendado)

### Paso 1.2: Subir tu código a GitHub (si no lo has hecho)
```bash
# En la raíz de tu proyecto
git init
git add .
git commit -m "Initial commit - Almy.W.E.B."
git branch -M main
git remote add origin https://github.com/TU_USUARIO/almyweb.git
git push -u origin main
```

### Paso 1.3: Desplegar en Railway
1. En Railway, haz clic en "Deploy from GitHub repo"
2. Selecciona tu repositorio `almyweb`
3. Railway detectará automáticamente que es Python
4. Configura las siguientes variables de entorno:

**Variables de entorno en Railway:**
```
SUPABASE_URL=tu_url_de_supabase
SUPABASE_KEY=tu_key_de_supabase
SECRET_KEY=almyweb_secret_key_2026_secure_token
PORT=8000
```

### Paso 1.4: Configurar el Root Directory
En Railway Settings:
- **Root Directory:** `backend`
- **Start Command:** `uvicorn server_rest:app --host 0.0.0.0 --port $PORT`

### Paso 1.5: Obtener la URL pública
1. Ve a Settings > Networking
2. Haz clic en "Generate Domain"
3. Copia la URL (ejemplo: `https://almyweb-production.up.railway.app`)
4. **GUARDA ESTA URL** - la necesitarás para el frontend

---

## PARTE 2: Preparar el Frontend para Hostinger (10 minutos)

### Paso 2.1: Configurar variables de entorno

Crea el archivo `.env.production` en la carpeta `frontend/`:
```env
REACT_APP_BACKEND_URL=https://tu-app.railway.app
```

**⚠️ IMPORTANTE:** Reemplaza `https://tu-app.railway.app` con la URL que obtuviste de Railway.

### Paso 2.2: Compilar el frontend
```bash
cd frontend
npm install
npm run build
```

Esto creará una carpeta `frontend/build/` con todos los archivos estáticos.

### Paso 2.3: Verificar el build
Deberías ver algo como:
```
frontend/build/
├── index.html
├── static/
│   ├── css/
│   ├── js/
│   └── media/
├── manifest.json
└── robots.txt
```

---

## PARTE 3: Subir a Hostinger (10 minutos)

### Paso 3.1: Acceder a cPanel
1. Inicia sesión en tu panel de Hostinger
2. Ve a "Administrador de archivos" o "File Manager"
3. Navega a la carpeta `public_html/`

### Paso 3.2: Limpiar public_html (si es necesario)
- Si hay archivos de ejemplo, bórralos
- Deja solo `.htaccess` si existe

### Paso 3.3: Subir los archivos del build
**Opción A: Usando File Manager de cPanel**
1. Comprime la carpeta `frontend/build/` en un ZIP
2. Sube el ZIP a `public_html/`
3. Extrae el contenido directamente en `public_html/`
4. Mueve todo de `build/` a la raíz de `public_html/`

**Opción B: Usando FTP (FileZilla)**
1. Conecta por FTP a tu Hostinger
2. Sube todo el contenido de `frontend/build/` a `public_html/`

### Paso 3.4: Crear archivo .htaccess
Crea o edita el archivo `.htaccess` en `public_html/`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Redirigir HTTP a HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  
  # React Router - Redirigir todas las rutas a index.html
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# Habilitar compresión GZIP
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache para archivos estáticos
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
</IfModule>
```

---

## PARTE 4: Configurar CORS en el Backend

Actualiza `backend/server_rest.py` para permitir tu dominio:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://tudominio.com",  # ⬅️ Agrega tu dominio de Hostinger
        "https://www.tudominio.com"  # ⬅️ Con www también
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Haz commit y push para que Railway se actualice automáticamente.

---

## PARTE 5: Verificación Final

### ✅ Checklist de verificación:

1. **Backend en Railway:**
   - [ ] URL pública funciona: `https://tu-app.railway.app/api/`
   - [ ] Variables de entorno configuradas
   - [ ] Logs sin errores

2. **Frontend en Hostinger:**
   - [ ] Archivos subidos a `public_html/`
   - [ ] `.htaccess` configurado
   - [ ] Dominio apunta correctamente

3. **Base de datos Supabase:**
   - [ ] Script SQL ejecutado
   - [ ] Tablas creadas con datos

4. **Pruebas funcionales:**
   - [ ] Página principal carga correctamente
   - [ ] Servicios se muestran
   - [ ] Portafolio funciona
   - [ ] Login admin funciona
   - [ ] Panel admin puede editar contenido

---

## 🔧 Solución de Problemas Comunes

### Problema 1: "Failed to fetch" en el frontend
**Causa:** CORS no configurado o URL del backend incorrecta

**Solución:**
1. Verifica que `REACT_APP_BACKEND_URL` en `.env.production` sea correcta
2. Recompila el frontend: `npm run build`
3. Actualiza CORS en `server_rest.py` con tu dominio

### Problema 2: Rutas de React no funcionan (404)
**Causa:** `.htaccess` no configurado correctamente

**Solución:**
1. Verifica que `.htaccess` esté en `public_html/`
2. Asegúrate que `mod_rewrite` esté habilitado en Hostinger

### Problema 3: Backend en Railway no inicia
**Causa:** Variables de entorno faltantes o comando incorrecto

**Solución:**
1. Verifica las variables de entorno en Railway
2. Revisa los logs en Railway Dashboard
3. Confirma que `requirements.txt` esté en `backend/`

### Problema 4: Imágenes o CSS no cargan
**Causa:** Rutas absolutas incorrectas

**Solución:**
1. Verifica que `package.json` tenga `"homepage": "."`
2. Recompila: `npm run build`

---

## 📊 Costos y Límites

### Railway (Backend) - Plan Gratuito:
- ✅ 500 horas/mes (suficiente para 24/7)
- ✅ 512 MB RAM
- ✅ 1 GB disco
- ✅ SSL automático
- ⚠️ Duerme después de 30 min de inactividad (se despierta en 1-2 segundos)

### Hostinger Business (Frontend):
- ✅ Ya lo tienes pagado
- ✅ 100 GB almacenamiento
- ✅ SSL gratis
- ✅ Dominio incluido

### Supabase (Base de Datos):
- ✅ 500 MB base de datos
- ✅ 2 GB transferencia/mes
- ✅ Autenticación incluida

**Total: $0/mes adicionales** (solo pagas Hostinger que ya tienes)

---

## 🚀 Próximos Pasos (Opcional)

### Mejoras recomendadas:
1. **Dominio personalizado en Railway:** Puedes usar un subdominio como `api.tudominio.com`
2. **CDN para imágenes:** Usar Cloudinary o ImgIX
3. **Monitoreo:** Configurar UptimeRobot para verificar disponibilidad
4. **Analytics:** Agregar Google Analytics
5. **Backup automático:** Configurar backups de Supabase

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs de Railway
2. Verifica la consola del navegador (F12)
3. Prueba los endpoints del backend directamente en el navegador

**¡Tu sitio estará en línea en menos de 1 hora!** 🎉
