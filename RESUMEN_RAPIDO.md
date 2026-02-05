# 🚀 Resumen Rápido - Despliegue en 3 Pasos

## Tu arquitectura:
```
HOSTINGER (Frontend) → RAILWAY (Backend) → SUPABASE (Database)
```

---

## PASO 1: Backend en Railway (15 min)

### A. Sube tu código a GitHub
```bash
git init
git add .
git commit -m "Deploy Almy.W.E.B."
git remote add origin https://github.com/TU_USUARIO/almyweb.git
git push -u origin main
```

### B. Despliega en Railway
1. Ve a https://railway.app
2. "New Project" → "Deploy from GitHub"
3. Selecciona tu repo
4. Agrega variables de entorno:
   - `SUPABASE_URL` = (tu URL)
   - `SUPABASE_KEY` = (tu key)
   - `SECRET_KEY` = almyweb_secret_key_2026_secure_token
5. Settings → Generate Domain
6. **COPIA LA URL** (ej: https://almyweb.railway.app)

---

## PASO 2: Compila el Frontend (5 min)

### A. Configura la URL del backend
Edita `frontend/.env.production`:
```
REACT_APP_BACKEND_URL=https://tu-url-de-railway.app
```

### B. Compila
```bash
cd frontend
npm install
npm run build
```

O simplemente ejecuta: `build-for-hostinger.bat`

---

## PASO 3: Sube a Hostinger (10 min)

### A. Accede a cPanel
1. Panel de Hostinger → File Manager
2. Ve a `public_html/`
3. Borra archivos de ejemplo (si hay)

### B. Sube los archivos
**Opción 1: ZIP**
- Comprime `frontend/build/` en ZIP
- Sube a `public_html/`
- Extrae ahí mismo
- Mueve todo de `build/` a la raíz

**Opción 2: FTP**
- Sube TODO el contenido de `frontend/build/` a `public_html/`

### C. Crea .htaccess
Copia el contenido de `frontend/.htaccess` a `public_html/.htaccess`

---

## PASO 4: Actualiza CORS (2 min)

Edita `backend/server_rest.py`:
```python
allow_origins=[
    "http://localhost:3000",
    "https://tudominio.com",      # ⬅️ Tu dominio
    "https://www.tudominio.com"
],
```

Sube los cambios:
```bash
git add backend/server_rest.py
git commit -m "Add domain to CORS"
git push
```

Railway se actualizará automáticamente.

---

## ✅ Verificación

1. Abre tu dominio → Debe cargar la página
2. Click 3x en el copyright → Login admin
3. Usuario: `admin` / Contraseña: `admin123`

---

## 🆘 Problemas Comunes

**"Failed to fetch"**
→ Verifica que `.env.production` tenga la URL correcta de Railway
→ Recompila: `npm run build`

**Rutas dan 404**
→ Verifica que `.htaccess` esté en `public_html/`

**Backend no responde**
→ Revisa logs en Railway Dashboard
→ Verifica variables de entorno

---

## 📁 Archivos Importantes Creados

- ✅ `GUIA_DESPLIEGUE_HOSTINGER.md` - Guía completa paso a paso
- ✅ `CHECKLIST_DESPLIEGUE.md` - Checklist interactivo
- ✅ `frontend/.env.production` - Config de producción
- ✅ `frontend/.htaccess` - Config para Hostinger
- ✅ `railway.json` - Config para Railway
- ✅ `Procfile` - Comando de inicio
- ✅ `build-for-hostinger.bat` - Script automático de build
- ✅ `.gitignore` - Archivos a ignorar en Git

---

**Tiempo total: ~30 minutos**
**Costo: $0/mes adicionales**

¡Listo para despegar! 🚀
