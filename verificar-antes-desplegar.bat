@echo off
echo ========================================
echo   VERIFICACION PRE-DESPLIEGUE
echo ========================================
echo.

set ERROR=0

echo [1/6] Verificando estructura de archivos...
if not exist "backend\server_rest.py" (
    echo   X FALTA: backend\server_rest.py
    set ERROR=1
) else (
    echo   OK: backend\server_rest.py
)

if not exist "backend\requirements.txt" (
    echo   X FALTA: backend\requirements.txt
    set ERROR=1
) else (
    echo   OK: backend\requirements.txt
)

if not exist "frontend\package.json" (
    echo   X FALTA: frontend\package.json
    set ERROR=1
) else (
    echo   OK: frontend\package.json
)

if not exist "frontend\.env.production" (
    echo   X FALTA: frontend\.env.production
    set ERROR=1
) else (
    echo   OK: frontend\.env.production
)

if not exist "railway.json" (
    echo   X FALTA: railway.json
    set ERROR=1
) else (
    echo   OK: railway.json
)

echo.
echo [2/6] Verificando .env.production...
findstr /C:"tu-app.railway.app" frontend\.env.production >nul
if %errorlevel% equ 0 (
    echo   ! ADVERTENCIA: Aun tienes la URL de ejemplo en .env.production
    echo     Recuerda cambiarla por tu URL real de Railway
    set ERROR=1
) else (
    echo   OK: URL configurada
)

echo.
echo [3/6] Verificando Git...
if not exist ".git" (
    echo   ! ADVERTENCIA: No hay repositorio Git inicializado
    echo     Ejecuta: git init
    set ERROR=1
) else (
    echo   OK: Git inicializado
)

echo.
echo [4/6] Verificando Node modules...
if not exist "frontend\node_modules" (
    echo   ! ADVERTENCIA: No hay node_modules
    echo     Ejecuta: cd frontend ^&^& npm install
    set ERROR=1
) else (
    echo   OK: node_modules instalados
)

echo.
echo [5/6] Verificando archivos de configuracion...
if not exist "frontend\.htaccess" (
    echo   X FALTA: frontend\.htaccess
    set ERROR=1
) else (
    echo   OK: frontend\.htaccess
)

if not exist ".gitignore" (
    echo   ! ADVERTENCIA: No hay .gitignore
    set ERROR=1
) else (
    echo   OK: .gitignore
)

echo.
echo [6/6] Verificando backend dependencies...
if not exist "backend\supabase_client.py" (
    echo   X FALTA: backend\supabase_client.py
    set ERROR=1
) else (
    echo   OK: backend\supabase_client.py
)

echo.
echo ========================================
if %ERROR% equ 0 (
    echo   TODO LISTO PARA DESPLEGAR!
    echo ========================================
    echo.
    echo PROXIMOS PASOS:
    echo 1. Sube tu codigo a GitHub
    echo 2. Despliega en Railway
    echo 3. Configura .env.production con la URL de Railway
    echo 4. Ejecuta: build-for-hostinger.bat
    echo 5. Sube el build a Hostinger
) else (
    echo   HAY PROBLEMAS QUE RESOLVER
    echo ========================================
    echo.
    echo Revisa los errores arriba y corrigelos antes de desplegar
)
echo.
pause
