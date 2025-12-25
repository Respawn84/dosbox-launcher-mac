# Guía rápida: Subir el proyecto a GitHub

## Paso 1: Crear repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `dosbox-launcher-mac`
3. Descripción: "Frontend moderno para DOSBox en macOS - Lanzador de juegos MS-DOS con terminal integrada"
4. Selecciona "Public" o "Private" según prefieras
5. **NO marques** "Add a README file" (ya lo tenemos)
6. **NO marques** "Add .gitignore" (ya lo tenemos)
7. **NO marques** "Choose a license" (ya lo tenemos)
8. Click en "Create repository"

## Paso 2: Inicializar Git local y subir

Abre la Terminal en la carpeta del proyecto y ejecuta estos comandos:

```bash
# Navegar a la carpeta del proyecto
cd /Users/daniel/Documents/Dosboxmac

# Inicializar repositorio Git
git init

# Añadir todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit: DOSBox Launcher v1.0.0

- Explorador de juegos con árbol de directorios
- Terminal MS-DOS libre con selección de punto de montaje
- Editor de configuración DOSBox integrado
- Soporte para múltiples perfiles de configuración
- Filtrado automático de ejecutables (.exe y .com)
- Interfaz moderna con tema oscuro
- Configuración optimizada para juegos clásicos (3000 ciclos)"

# Conectar con GitHub (IMPORTANTE: reemplaza TU_USUARIO con tu nombre de usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/dosbox-launcher-mac.git

# Verificar que se añadió correctamente
git remote -v

# Subir a GitHub
git branch -M main
git push -u origin main
```

## Paso 3: Verificar

1. Ve a https://github.com/TU_USUARIO/dosbox-launcher-mac
2. Deberías ver todos tus archivos y el README.md renderizado

## Comandos útiles para futuros cambios

### Añadir cambios y subirlos:
```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

### Ver el estado de tus archivos:
```bash
git status
```

### Ver el historial de commits:
```bash
git log --oneline
```

### Crear un nuevo release (versión):
```bash
# Actualizar versión en package.json primero (ejemplo: 1.1.0)

# Crear tag
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

## Paso 4: Crear el primer Release (opcional pero recomendado)

1. Ve a tu repositorio en GitHub
2. Click en "Releases" (en la barra lateral derecha)
3. Click en "Create a new release"
4. Tag: `v1.0.0`
5. Title: `DOSBox Launcher v1.0.0`
6. Description:
   ```
   Primera versión pública de DOSBox Launcher para macOS
   
   ### Características
   - 🎮 Explorador de juegos con árbol de directorios
   - 💻 Terminal MS-DOS libre
   - ⚙️ Editor de configuración integrado
   - 💾 Múltiples perfiles
   - 🚀 Lanzamiento rápido con doble clic
   
   ### Requisitos
   - macOS 10.13+
   - DOSBox instalado
   
   ### Instalación
   Ver README.md para instrucciones detalladas
   ```
7. Adjuntar archivos (opcional): Si has creado el .dmg, súbelo aquí
8. Click en "Publish release"

## Estructura final del repositorio

```
dosbox-launcher-mac/
├── .git/                # Carpeta Git (oculta)
├── .gitignore           # Archivos a ignorar
├── BUILD.md             # Guía de construcción
├── CONTRIBUTING.md      # Guía de contribución
├── LICENSE              # Licencia MIT
├── README.md            # Documentación principal
├── index.html           # Interfaz HTML
├── main.js              # Backend Electron
├── package.json         # Configuración npm
├── renderer.js          # Frontend JavaScript
└── styles.css           # Estilos CSS
```

## Notas importantes

- **node_modules/** NO se subirá (está en .gitignore)
- **dist/** NO se subirá (está en .gitignore)
- Los usuarios clonarán y harán `npm install` para obtener las dependencias
- O descargarán el ejecutable .dmg desde Releases

## Actualizar el README con tu usuario

Antes de hacer el commit, actualiza en README.md:
- Busca `TU_USUARIO` y reemplázalo con tu usuario real de GitHub
- En package.json también

## Badges opcionales para el README

Puedes añadir estos badges al principio del README.md:

```markdown
[![GitHub release](https://img.shields.io/github/release/TU_USUARIO/dosbox-launcher-mac.svg)](https://github.com/TU_USUARIO/dosbox-launcher-mac/releases)
[![GitHub downloads](https://img.shields.io/github/downloads/TU_USUARIO/dosbox-launcher-mac/total.svg)](https://github.com/TU_USUARIO/dosbox-launcher-mac/releases)
[![GitHub stars](https://img.shields.io/github/stars/TU_USUARIO/dosbox-launcher-mac.svg)](https://github.com/TU_USUARIO/dosbox-launcher-mac/stargazers)
```
