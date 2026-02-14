# 🔍 Guía de Verificación - Google Search Console

## ✅ Código de Verificación Agregado

Tu código de verificación ya está integrado en el sitio:
```
google-site-verification=LzQU8Nu4Qs_-LyvcPvLjtIeK_tNqkSGiE6BsRDuGJwI
```

---

## 📋 Método 1: Meta Tag HTML (Más Fácil) ✅ LISTO

### ✅ Ya Configurado

El meta tag de verificación ya está agregado en:
- ✅ `index.html` (página principal)
- ✅ `google-site-verification.html` (página de verificación)

### Pasos para Verificar:

1. **Sube los archivos actualizados a Hostinger**
   - Sube `index.html` actualizado
   - Sube `google-site-verification.html`

2. **En Google Search Console**
   - Selecciona el método "Etiqueta HTML"
   - Verifica que el código coincida: `LzQU8Nu4Qs_-LyvcPvLjtIeK_tNqkSGiE6BsRDuGJwI`
   - Haz clic en "VERIFICAR"

3. **Espera la confirmación**
   - Google verificará automáticamente
   - Puede tardar unos segundos

---

## 📋 Método 2: Registro TXT en DNS (Recomendado por Google)

### Pasos Detallados:

#### 1. Accede a Hostinger hPanel
   - Ve a https://hpanel.hostinger.com
   - Inicia sesión con tu cuenta

#### 2. Navega a DNS
   - En el panel, busca tu dominio `almyweb.com`
   - Haz clic en "DNS / Nameservers"
   - O busca "Zona DNS" o "DNS Zone Editor"

#### 3. Agregar Registro TXT
   - Haz clic en "Agregar registro" o "Add Record"
   - Selecciona tipo: **TXT**
   - Completa los campos:

   ```
   Tipo: TXT
   Nombre/Host: @ (o deja en blanco, o escribe "almyweb.com")
   Valor/Contenido: google-site-verification=LzQU8Nu4Qs_-LyvcPvLjtIeK_tNqkSGiE6BsRDuGJwI
   TTL: 3600 (o el valor por defecto)
   ```

#### 4. Guardar Cambios
   - Haz clic en "Guardar" o "Save"
   - Los cambios DNS pueden tardar hasta 48 horas (normalmente 1-2 horas)

#### 5. Verificar en Google Search Console
   - Vuelve a Google Search Console
   - Haz clic en "VERIFICAR"
   - Si dice que no encuentra el registro, espera 1 hora e intenta de nuevo

---

## 🎯 ¿Cuál Método Usar?

### Método 1: Meta Tag HTML (Recomendado para ti) ⭐
**Ventajas:**
- ✅ Más rápido (inmediato)
- ✅ No requiere acceso a DNS
- ✅ Ya está configurado en tu sitio
- ✅ Funciona apenas subas los archivos

**Desventajas:**
- ❌ Debes mantener el meta tag en el sitio

### Método 2: Registro TXT DNS
**Ventajas:**
- ✅ Más permanente
- ✅ Recomendado por Google
- ✅ No afecta el HTML

**Desventajas:**
- ❌ Requiere acceso a configuración DNS
- ❌ Puede tardar horas en propagarse

---

## 🚀 Pasos Siguientes (Después de Verificar)

### 1. Enviar Sitemap
Una vez verificado, envía tu sitemap:
```
https://almyweb.com/sitemap.xml
```

**Cómo:**
- En Google Search Console
- Ve a "Sitemaps" en el menú lateral
- Ingresa: `sitemap.xml`
- Haz clic en "Enviar"

### 2. Solicitar Indexación
Solicita que Google indexe tus páginas principales:
- `https://almyweb.com/`
- `https://almyweb.com/portfolio/`
- `https://almyweb.com/contacto/`

**Cómo:**
- En Google Search Console
- Ve a "Inspección de URLs"
- Pega cada URL
- Haz clic en "Solicitar indexación"

### 3. Configurar Preferencias
- **País de destino**: Ecuador
- **Idioma**: Español
- **Público objetivo**: Ecuador

### 4. Monitorear Rendimiento
Después de unos días, podrás ver:
- ✅ Impresiones en búsquedas
- ✅ Clics desde Google
- ✅ Posición promedio
- ✅ Palabras clave que generan tráfico

---

## 📊 Verificar que Funciona

### Prueba 1: Meta Tag
Visita tu sitio y ve el código fuente (Ctrl+U):
```html
<meta name="google-site-verification" content="LzQU8Nu4Qs_-LyvcPvLjtIeK_tNqkSGiE6BsRDuGJwI"/>
```

### Prueba 2: Archivo de Verificación
Visita:
```
https://almyweb.com/google-site-verification.html
```
Debe cargar sin errores.

### Prueba 3: DNS (si usas Método 2)
Usa esta herramienta para verificar el registro TXT:
```
https://mxtoolbox.com/TXTLookup.aspx
```
Ingresa: `almyweb.com`

---

## ❓ Solución de Problemas

### Error: "No se pudo verificar"
**Solución:**
1. Verifica que subiste los archivos actualizados
2. Limpia caché del navegador (Ctrl+Shift+R)
3. Espera 5 minutos e intenta de nuevo
4. Verifica que el código sea exactamente: `LzQU8Nu4Qs_-LyvcPvLjtIeK_tNqkSGiE6BsRDuGJwI`

### Error: "Registro DNS no encontrado"
**Solución:**
1. Verifica que agregaste el registro TXT correctamente
2. Espera 1-2 horas para propagación DNS
3. Usa el Método 1 (Meta Tag) mientras tanto

### Error: "Acceso denegado"
**Solución:**
1. Verifica que el archivo `.htaccess` no bloquee el acceso
2. Verifica permisos del archivo (644)

---

## 📈 Optimización SEO Post-Verificación

Una vez verificado, Google Search Console te permitirá:

### 1. Monitorear Keywords
Ver qué búsquedas llevan usuarios a tu sitio:
- "desarrollo web ecuador" ⭐
- "diseño web ecuador"
- "páginas web ecuador"
- "almyweb"

### 2. Detectar Errores
- Errores 404
- Problemas de indexación
- Errores de rastreo
- Problemas de usabilidad móvil

### 3. Mejorar Rendimiento
- Core Web Vitals
- Velocidad de carga
- Experiencia de usuario

### 4. Enlaces Entrantes
Ver qué sitios enlazan al tuyo (backlinks)

---

## ✅ Checklist Final

Antes de verificar, asegúrate de:

- [ ] Archivos subidos a Hostinger
  - [ ] `index.html` actualizado
  - [ ] `google-site-verification.html` actualizado
- [ ] Sitio accesible en `https://almyweb.com`
- [ ] Sin errores 404 en página principal
- [ ] Sitemap accesible en `/sitemap.xml`
- [ ] Robots.txt accesible en `/robots.txt`

Después de verificar:

- [ ] Sitemap enviado
- [ ] Páginas principales indexadas
- [ ] País configurado (Ecuador)
- [ ] Monitoreo activado

---

## 🎉 ¡Listo!

Tu sitio está configurado para verificación en Google Search Console.

**Recomendación:** Usa el Método 1 (Meta Tag HTML) porque es más rápido y ya está configurado.

**Tiempo estimado:** 5 minutos después de subir los archivos.

---

© 2026 AlmyWEB - Desarrollo Web Ecuador

