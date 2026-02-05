# ✅ Checklist de Despliegue - Almy.W.E.B.

## ANTES DE EMPEZAR
- [ ] Tienes cuenta en Hostinger Business (✓ Ya la tienes)
- [ ] Tienes cuenta en Supabase con tu base de datos configurada
- [ ] Tienes cuenta en GitHub (para Railway)

---

## FASE 1: BACKEND EN RAILWAY (15 min)

### Preparación
- [ ] Crear cuenta en https://railway.app
- [ ] Conectar con GitHub

### Subir código a GitHub
```bash
git init
git add .
git commit -m "Deploy Almy.W.E.B."
git branch -M main
git remote add origin https://github.com/TU_USUARIO/almyweb.git
git push -u origin main
```

### Configurar Railway
- [ ] Crear nuevo proyecto en Railway
- [ ] Conectar repositorio de GitHub
- [ ] Configurar variables de entorno:
  - [ ] `SUPABASE_URL` = (tu URL de Supabase)
  - [ ] `SUPABASE_KEY` = (tu API Key de Supabase)
  - [ ] `SECRET_KEY` = almyweb_secret_key_2026_secure_token
  - [ ] `PORT` = 8000

### Configurar despliegue
- [ ] Root Directory: `backend`
- [ ] Start Command: `uvicorn server_rest:app --host 0.0.0.0 --port $PORT`
- [ ] Generar dominio público
- [ ] **COPIAR Y GUARDAR LA URL** (ejemplo: https://almyweb-production.up.railway.app)

### Verificar backend
- [ ] Abrir en navegador: `https://tu-url.railway.app/api/`
- [ ] Debe mostrar: `{"message": "Almy.W.E.B. API"}`

---

## FASE 2: FRONTEND PARA HOSTINGER (10 min)

### Configurar variables de entorno
- [ ] Editar `frontend/.env.production`
- [ ] Reemplazar `https://tu-app.railway.app` con tu URL de Railway
- [ ] Guardar el archivo

### Compilar frontend
```bash
cd frontend
npm install
npm run build
```

### Verificar build
- [ ] Carpeta `frontend/build/` creada
- [ ] Contiene: index.html, static/, manifest.json

### Preparar para subir
- [ ] Comprimir carpeta `build/` en ZIP (opcional)
- [ ] O tener FileZilla listo para FTP

---

## FASE 3: SUBIR A HOSTINGER (10 min)

### Acceder a Hostinger
- [ ] Iniciar sesión en panel de Hostinger
- [ ] Ir a "Administrador de archivos" o "File Manager"
- [ ] Navegar a `public_html/`

### Limpiar carpeta (si es necesario)
- [ ] Eliminar archivos de ejemplo
- [ ] Mantener `.htaccess` si existe

### Subir archivos
**Opción A: File Manager**
- [ ] Subir ZIP de `build/` a `public_html/`
- [ ] Extraer contenido
- [ ] Mover archivos de `build/` a raíz de `public_html/`

**Opción B: FTP**
- [ ] Conectar con FileZilla
- [ ] Subir TODO el contenido de `build/` a `public_html/`

### Configurar .htaccess
- [ ] Copiar contenido de `frontend/.htaccess`
- [ ] Crear/editar `.htaccess` en `public_html/`
- [ ] Pegar el contenido
- [ ] Guardar

---

## FASE 4: CONFIGURAR CORS (5 min)

### Actualizar backend
- [ ] Abrir `backend/server_rest.py`
- [ ] Buscar `CORSMiddleware`
- [ ] Agregar tu dominio a `allow_origins`:
```python
allow_origins=[
    "http://localhost:3000",
    "https://tudominio.com",      # ⬅️ Tu dominio
    "https://www.tudominio.com"   # ⬅️ Con www
],
```

### Actualizar Railway
```bash
git add backend/server_rest.py
git commit -m "Add production domain to CORS"
git push
```
- [ ] Esperar que Railway redeploy automáticamente (1-2 min)

---

## FASE 5: VERIFICACIÓN FINAL (5 min)

### Probar sitio web
- [ ] Abrir tu dominio en navegador
- [ ] Página principal carga correctamente
- [ ] Ver servicios (deben aparecer 3)
- [ ] Ver portafolio (deben aparecer 7 proyectos)
- [ ] Ver testimonios (deben aparecer 3)
- [ ] Footer con mapa de Google Maps

### Probar panel admin
- [ ] Hacer 3 clicks en el copyright del footer
- [ ] Redirige a `/admin/login`
- [ ] Login con: `admin` / `admin123`
- [ ] Dashboard carga correctamente
- [ ] Probar editar contenido
- [ ] Probar agregar servicio
- [ ] Probar editar portafolio

### Verificar en móvil
- [ ] Abrir en celular
- [ ] Diseño responsive funciona
- [ ] Menú hamburguesa funciona
- [ ] Todas las secciones cargan

---

## 🎉 ¡LISTO! TU SITIO ESTÁ EN LÍNEA

### URLs importantes:
- **Sitio web:** https://tudominio.com
- **Panel admin:** https://tudominio.com/admin/login
- **Backend API:** https://tu-app.railway.app/api/
- **Base de datos:** Panel de Supabase

### Credenciales admin:
- **Usuario:** admin
- **Contraseña:** admin123
- ⚠️ **CAMBIAR DESPUÉS DEL PRIMER LOGIN**

---

## 🔧 Si algo falla...

### Backend no responde
1. Revisar logs en Railway Dashboard
2. Verificar variables de entorno
3. Verificar que Supabase esté activo

### Frontend muestra página en blanco
1. Abrir consola del navegador (F12)
2. Buscar errores de CORS
3. Verificar que `.env.production` tenga la URL correcta
4. Recompilar: `npm run build`

### Rutas de React dan 404
1. Verificar que `.htaccess` esté en `public_html/`
2. Verificar que `mod_rewrite` esté habilitado

### No puede hacer login
1. Verificar que ejecutaste el script SQL en Supabase
2. Verificar conexión backend-Supabase en logs de Railway

---

## 📊 Monitoreo

### Revisar periódicamente:
- [ ] Logs de Railway (errores del backend)
- [ ] Uso de recursos en Railway (RAM, CPU)
- [ ] Espacio en Hostinger
- [ ] Backups de Supabase

### Mantenimiento mensual:
- [ ] Revisar actualizaciones de dependencias
- [ ] Verificar certificado SSL
- [ ] Revisar analytics (si los instalas)

---

**Tiempo total estimado: 45 minutos**
**Costo adicional: $0/mes** (solo pagas Hostinger que ya tienes)

¡Éxito con tu despliegue! 🚀
