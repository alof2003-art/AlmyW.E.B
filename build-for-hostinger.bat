@echo off
echo ========================================
echo   COMPILANDO FRONTEND PARA HOSTINGER
echo ========================================
echo.

cd frontend

echo [1/3] Instalando dependencias...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Fallo la instalacion de dependencias
    pause
    exit /b 1
)

echo.
echo [2/3] Compilando React...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Fallo la compilacion
    pause
    exit /b 1
)

echo.
echo [3/3] Copiando .htaccess al build...
copy .htaccess build\.htaccess

echo.
echo ========================================
echo   COMPILACION EXITOSA!
echo ========================================
echo.
echo Los archivos estan en: frontend\build\
echo.
echo PROXIMOS PASOS:
echo 1. Comprime la carpeta 'build' en un ZIP
echo 2. Sube el ZIP a public_html en Hostinger
echo 3. Extrae el contenido en public_html
echo.
echo O usa FTP para subir el contenido de 'build' directamente
echo.
pause
