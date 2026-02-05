# 🎯 EMPIEZA AQUÍ - Despliegue Almy.W.E.B.

## 📋 ¿Qué tienes ahora?

✅ **Hostinger Business** - Para el frontend (archivos estáticos)  
✅ **Supabase** - Base de datos PostgreSQL  
✅ **Código listo** - Frontend React + Backend FastAPI  

## 🎯 ¿Qué necesitas hacer?

Desplegar el backend en **Railway** (gratis) y el frontend en **Hostinger**

---

## 🚀 PROCESO EN 4 PASOS (30 minutos)

### PASO 1: Verificar que todo está listo (2 min)
```bash
verificar-antes-desplegar.bat
```
Este script revisa que tengas todos los archivos necesarios.

---

### PASO 2: Desplegar Backend en Railway (15 min)

#### A. Sube tu código a GitHub
```bash
git init
git add .
git commit -m "Deploy Almy.W.E.B."
git branch -M main
git remote add origin https://github.com/TU_USUARIO/almyweb.git
git push -u origin main
```

#### B. Configura Railway
1. Ve a **https://railway.app**
2. Crea cuenta (usa GitHub)
3. Click en **"New Project"**
4. Selecciona **"Deploy from GitHub repo"**
5. Elige tu repositorio `almyweb`

#### C. Configura Variables de Entorno
En Railway Dashboard → Variables:
```
SUPABASE_URL = https://tu-proyecto.supabase.co
SUPABASE_KEY = tu_anon_key_aqui
SECRET_KEY = almyweb_secret_key_2026_secure_token
PORT = 8000
```

**¿Dónde encuentro SUPABASE_URL y SUPABASE_KEY?**
- Ve a https://supabase.com/dashboard
- Selecciona tu proyecto
- Settings → API
- Copia "Project URL" y "anon public key"

#### D. Genera Dominio Público
1. En Railway → Settings → Networking
2. Click **"Generate Domain"**
3. **COPIA LA URL** (ejemplo: `https://almyweb-production.up.railway.app`)

#### E. Verifica que funciona
Abre en tu navegador:
```
https://tu-url.railway.app/api/
```
Debe mostrar: `{"message": "Almy.W.E.B. API"}`

---

### PASO 3: Compilar Frontend (5 min)

#### A. Configura la URL del backend
Edita `frontend/.env.production`:
```env
REACT_APP_BACKEND_URL=https://tu-url-de-railway.app
```
⚠️ **Reemplaza con tu URL real de Railway**

#### B. Compila el frontend
**Opción fácil:**
```bash
build-for-hostinger.bat
```

**Opción manual:**
```bash
cd frontend
npm install
npm run build
```

Esto crea la carpeta `frontend/build/` con tu sitio listo.

---

### PASO 4: Subir a Hostinger (10 min)

#### A. Accede a tu Hostinger
1. Panel de Hostinger → **File Manager** (Administrador de archivos)
2. Navega a `public_html/`
3. Elimina archivos de ejemplo (si hay)

#### B. Sube los archivos

**Método 1: ZIP (Recomendado)**
1. Comprime la carpeta `frontend/build/` en un archivo ZIP
2. Sube el ZIP a `public_html/` en Hostinger
3. Click derecho → **Extract** (Extraer)
4. Mueve todo de la carpeta `build/` a la raíz de `public_html/`

**Método 2: FTP**
1. Usa FileZilla o el FTP de Hostinger
2. Sube TODO el contenido de `frontend/build/` directamente a `public_html/`

#### C. Configura .htaccess
1. En `public_html/`, crea o edita el archivo `.htaccess`
2. Copia el contenido de `frontend/.htaccess`
3. Pega en `public_html/.htaccess`
4. Guarda

---

### PASO 5: Actualizar CORS (2 min)

Para que tu frontend pueda comunicarse con el backend:

1. Edita `backend/server_rest.py`
2. Busca la sección `CORSMiddleware`
3. Agrega tu dominio:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://tudominio.com",      # ⬅️ Tu dominio de Hostinger
        "https://www.tudominio.com"   # ⬅️ Con www también
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

4. Sube los cambios:
```bash
git add backend/server_rest.py
git commit -m "Add production domain to CORS"
git push
```

Railway se actualizará automáticamente en 1-2 minutos.

---

## ✅ VERIFICACIÓN FINAL

### Prueba tu sitio:
1. Abre tu dominio: `https://tudominio.com`
2. Debe cargar la página principal
3. Verifica que se vean los servicios y portafolio

### Prueba el admin:
1. Haz **3 clicks** en el texto del copyright del footer
2. Te redirige a `/admin/login`
3. Login: `admin` / `admin123`
4. Debe cargar el dashboard

---

## 📚 DOCUMENTACIÓN COMPLETA

Si necesitas más detalles, revisa:

- **`RESUMEN_RAPIDO.md`** - Versión condensada
- **`GUIA_DESPLIEGUE_HOSTINGER.md`** - Guía completa paso a paso
- **`CHECKLIST_DESPLIEGUE.md`** - Checklist interactivo
- **`backend/README_RAILWAY.md`** - Info específica de Railway

---

## 🆘 PROBLEMAS COMUNES

### "Failed to fetch" o errores de red
**Causa:** URL del backend incorrecta o CORS no configurado

**Solución:**
1. Verifica `frontend/.env.production` tenga la URL correcta
2. Recompila: `npm run build`
3. Verifica CORS en `backend/server_rest.py`

### Rutas de React dan 404
**Causa:** `.htaccess` no configurado

**Solución:**
1. Verifica que `.htaccess` esté en `public_html/`
2. Copia el contenido de `frontend/.htaccess`

### Backend no responde
**Causa:** Variables de entorno incorrectas

**Solución:**
1. Revisa logs en Railway Dashboard
2. Verifica variables de entorno (SUPABASE_URL, SUPABASE_KEY)
3. Verifica que Supabase esté activo

### No puedo hacer login
**Causa:** Base de datos no inicializada

**Solución:**
1. Ve a Supabase → SQL Editor
2. Ejecuta el script completo de `backend/seed_data.sql`

---

## 💰 COSTOS

- **Hostinger Business:** Ya lo tienes pagado ✅
- **Railway:** $0/mes (plan gratuito - 500 hrs/mes)
- **Supabase:** $0/mes (plan gratuito)

**Total adicional: $0/mes** 🎉

---

## 🎉 ¡LISTO!

Una vez completados los pasos, tu sitio estará en línea en:
- **Frontend:** https://tudominio.com
- **Admin:** https://tudominio.com/admin/login
- **Backend API:** https://tu-app.railway.app/api/

**Tiempo total: ~30 minutos**

¡Éxito con tu despliegue! 🚀
