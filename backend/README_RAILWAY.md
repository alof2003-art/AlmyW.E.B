# Backend Almy.W.E.B. - Railway Deployment

## Variables de Entorno Requeridas

Configura estas variables en Railway Dashboard:

```
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu_anon_key_de_supabase
SECRET_KEY=almyweb_secret_key_2026_secure_token
PORT=8000
```

## Cómo obtener las credenciales de Supabase:

1. Ve a tu proyecto en https://supabase.com/dashboard
2. Settings → API
3. Copia:
   - **Project URL** → `SUPABASE_URL`
   - **anon/public key** → `SUPABASE_KEY`

## Verificar que funciona:

Una vez desplegado, abre:
```
https://tu-app.railway.app/api/
```

Deberías ver:
```json
{"message": "Almy.W.E.B. API"}
```

## Endpoints disponibles:

### Públicos:
- `GET /api/` - Health check
- `POST /api/auth/login` - Login admin
- `GET /api/content` - Contenido del sitio
- `GET /api/services` - Servicios
- `GET /api/portfolio` - Proyectos
- `GET /api/testimonials` - Testimonios
- `GET /api/social-links` - Redes sociales
- `GET /api/footer-config` - Config del footer

### Protegidos (requieren token):
- `PUT /api/admin/content` - Actualizar contenido
- `POST /api/admin/services` - Crear servicio
- `PUT /api/admin/services/{id}` - Actualizar servicio
- `DELETE /api/admin/services/{id}` - Eliminar servicio
- (Y más endpoints de admin...)

## Troubleshooting:

### Error: "Module not found"
→ Verifica que `requirements.txt` esté en la carpeta `backend/`

### Error: "Connection refused"
→ Verifica las variables de entorno de Supabase

### Error: "CORS"
→ Agrega tu dominio en `server_rest.py` en la sección `allow_origins`
