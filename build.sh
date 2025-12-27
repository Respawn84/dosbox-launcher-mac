#!/bin/bash

# Script para construir DOSBox Launcher
# Autor: Daniel
# Uso: ./build.sh

set -e  # Detener si hay algún error

echo "======================================"
echo "  DOSBox Launcher - Build Script"
echo "======================================"
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: Debes ejecutar este script desde la carpeta del proyecto"
    echo "   cd /Users/daniel/Documents/Dosboxmac"
    exit 1
fi

# Verificar que Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado"
    echo "   Instala Node.js desde: https://nodejs.org/"
    exit 1
fi

# Verificar que npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm no está instalado"
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ npm version: $(npm --version)"
echo ""

# Verificar si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
    echo "✓ Dependencias instaladas"
    echo ""
else
    echo "✓ Dependencias ya instaladas"
    echo ""
fi

# Limpiar carpeta dist anterior si existe
if [ -d "dist" ]; then
    echo "🧹 Limpiando builds anteriores..."
    rm -rf dist
    echo "✓ Limpieza completada"
    echo ""
fi

# Preguntar qué tipo de build hacer
echo "Selecciona el tipo de build:"
echo "1) DMG (recomendado para distribución)"
echo "2) ZIP (archivo comprimido)"
echo "3) DIR (solo carpeta .app para testing)"
echo ""
read -p "Opción [1-3]: " BUILD_OPTION

case $BUILD_OPTION in
    1)
        echo ""
        echo "🔨 Construyendo DMG..."
        npm run build:dmg
        BUILD_TYPE="DMG"
        ;;
    2)
        echo ""
        echo "🔨 Construyendo ZIP..."
        npm run build
        BUILD_TYPE="ZIP"
        ;;
    3)
        echo ""
        echo "🔨 Construyendo directorio .app..."
        npm run build:dir
        BUILD_TYPE="DIR"
        ;;
    *)
        echo "❌ Opción inválida"
        exit 1
        ;;
esac

echo ""
echo "======================================"
echo "  ✅ Build completado exitosamente"
echo "======================================"
echo ""
echo "📁 Archivos generados en:"
echo "   $(pwd)/dist/"
echo ""

# Mostrar archivos generados
if [ -d "dist" ]; then
    echo "Contenido:"
    ls -lh dist/ | grep -v "^total" | awk '{print "   " $9 " (" $5 ")"}'
    echo ""
fi

# Instrucciones según el tipo de build
case $BUILD_TYPE in
    "DMG")
        echo "📀 Para instalar:"
        echo "   1. Abre el archivo .dmg en dist/"
        echo "   2. Arrastra 'DOSBox Launcher.app' a /Applications"
        echo "   3. Primera vez: Click derecho → Abrir"
        ;;
    "ZIP")
        echo "📦 Para instalar:"
        echo "   1. Descomprime el archivo .zip en dist/"
        echo "   2. Mueve 'DOSBox Launcher.app' a /Applications"
        echo "   3. Primera vez: Click derecho → Abrir"
        ;;
    "DIR")
        echo "📂 Para usar:"
        echo "   1. La aplicación está en dist/mac/"
        echo "   2. Puedes ejecutarla directamente desde ahí"
        echo "   3. O copiarla a /Applications"
        ;;
esac

echo ""
echo "💡 Tip: Para distribuir, usa la opción DMG"
echo ""
