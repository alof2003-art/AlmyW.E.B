# ⚡ Comandos Rápidos - Copy & Paste

## 🔧 CONFIGURACIÓN INICIAL

### 1. Inicializar Git y subir a GitHub
```bash
git init
git add .
git commit -m "Deploy Almy.W.E.B."
git branch -M main
git remote add origin https://github.com/TU_USUARIO/almyweb.git
git push -u origin main
```

---

## 🏗️ COMPILAR FRONTEND

### Opción 1: Script automático (Windows)
```bash
build-for-hostinger.bat
```

### Opción 2: Manual
```bash
cd frontend
npm install
npm run build
cd ..
```

---

## 🔍 VERIFICAR ANTES DE DESPLEGAR

```bash
verificar-antes-desplegar.bat
```

---

## 🚀 ACTUALIZAR DESPUÉS DE CAMBIOS

### Si cambias el backend:
```bash
git add backend/
git commit -m "Update backend"
git push
```
Railway se actualiza automáticamente en 1-2 minutos.

### Si cambias el frontend:
```bash
cd frontend
npm run build
cd ..
```
Luego sube el contenido de `frontend/build/` a Hostinger.

---

## 🧪 PROBAR LOCALMENTE

### Backend:
```bash
cd backend
python server_rest.py
```
Abre: http://localhost:8000/api/

### Frontend:
```bash
cd frontend
npm start
```
Abre: http://localhost:3000

---

## 📦 VARIABLES DE ENTORNO

### Railway (Backend):
```
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu_anon_key_aqui
SECRET_KEY=almyweb_secret_key_2026_secure_token
PORT=8000
```

### Frontend (.env.production):
```
REACT_APP_BACKEND_URL=https://tu-app.railway.app
```

---

## 🔄 ACTUALIZAR CORS

Edita `backend/server_rest.py`:
```python
allow_origins=[
    "http://localhost:3000",
    "https://tudominio.com",
    "https://www.tudominio.com"
],
```

Luego:
```bash
git add backend/server_rest.py
git commit -m "Update CORS"
git push
```

---

## 📊 VERIFICAR DESPLIEGUE

### Backend (Railway):
```
https://tu-app.railway.app/api/
```
Debe mostrar: `{"message": "Almy.W.E.B. API"}`

### Frontend (Hostinger):
```
https://tudominio.com
```
Debe cargar la página principal

### Admin:
```
https://tudominio.com/admin/login
```
Login: `admin` / `admin123`

---

## 🗄️ BASE DE DATOS

### Ejecutar script SQL en Supabase:
1. Ve a https://supabase.com/dashboard
2. SQL Editor → New Query
3. Copia todo el contenido de `backend/seed_data.sql`
4. Run

### Verificar datos:
```sql
SELECT 'Admins' as tabla, COUNT(*) as registros FROM admins
UNION ALL
SELECT 'Services', COUNT(*) FROM services
UNION ALL
SELECT 'Portfolio', COUNT(*) FROM portfolio_projects;
```

---

## 🔐 CAMBIAR CONTRASEÑA ADMIN

### Generar nueva contraseña hasheada:
```bash
cd backend
python generate_password.py
```

### Actualizar en Supabase:
```sql
UPDATE admins 
SET password_hash = 'nuevo_hash_aqui' 
WHERE username = 'admin';
```

---

## 📁 ESTRUCTURA DE ARCHIVOS PARA HOSTINGER

```
public_html/
├── index.html
├── .htaccess
├── static/
│   ├── css/
│   ├── js/
│   └── media/
├── manifest.json
└── robots.txt
```

Todo esto viene de `frontend/build/`

---

## 🧹 LIMPIAR Y RECOMPILAR

```bash
cd frontend
rmdir /s /q build
rmdir /s /q node_modules
npm install
npm run build
cd ..
```

---

## 📝 LOGS Y DEBUG

### Ver logs de Railway:
1. Railway Dashboard
2. Tu proyecto
3. Deployments → View Logs

### Ver logs del frontend:
1. Abre tu sitio
2. F12 (DevTools)
3. Console

---

## 🔗 URLS IMPORTANTES

- **Railway:** https://railway.app
- **Supabase:** https://supabase.com/dashboard
- **Hostinger:** https://hpanel.hostinger.com
- **Tu sitio:** https://tudominio.com
- **Tu API:** https://tu-app.railway.app/api/

---

## 🆘 COMANDOS DE EMERGENCIA

### Revertir último commit:
```bash
git reset --soft HEAD~1
```

### Forzar push (cuidado):
```bash
git push -f origin main
```

### Ver estado de Git:
```bash
git status
```

### Ver logs de Git:
```bash
git log --oneline
```

---

## 📞 CONTACTO WHATSAPP (del sitio)

El botón de contacto envía a:
```
https://wa.me/593992286986
```

Para cambiar el número, edita desde el panel admin o actualiza en el código.

---

**Guarda este archivo para referencia rápida!** 📌
