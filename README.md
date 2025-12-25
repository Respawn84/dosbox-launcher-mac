# DOSBox Launcher para Mac

<div align="center">

🎮 Frontend moderno para ejecutar juegos de MS-DOS con DOSBox en macOS

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![macOS](https://img.shields.io/badge/macOS-10.13+-blue.svg)](https://www.apple.com/macos)
[![DOSBox](https://img.shields.io/badge/DOSBox-Required-green.svg)](https://www.dosbox.com/)

</div>

---

## 📋 Tabla de contenidos

- [Características](#-características)
- [Capturas de pantalla](#-capturas-de-pantalla)
- [Requisitos](#-requisitos)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Configuración](#-configuración)
- [Construcción del ejecutable](#-construcción-del-ejecutable)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

## ✨ Características

- 🎮 **Explorador de archivos** tipo árbol para navegar por tus juegos
- 💻 **Terminal MS-DOS libre** para ejecutar Windows 3.11, QBasic o explorar DOS
- ⚙️ **Editor de configuración** de DOSBox integrado
- 💾 **Múltiples perfiles** de configuración para diferentes necesidades
- 🚀 **Lanzamiento rápido** con doble clic en ejecutables
- 📁 **Filtrado inteligente** de ejecutables (.exe y .com)
- 🎨 **Interfaz moderna** con tema oscuro inspirado en VS Code
- 🔧 **Sin dependencias** una vez compilado

## 📸 Capturas de pantalla

_(Aquí puedes añadir capturas de pantalla cuando subas el proyecto a GitHub)_

## 📦 Requisitos

### Para usar el ejecutable:
- macOS 10.13 (High Sierra) o superior
- [DOSBox](https://www.dosbox.com/) instalado en `/Applications/dosbox.app/`

### Para desarrollo:
- Node.js 18 o superior
- npm (incluido con Node.js)

## 🚀 Instalación

### Opción 1: Descargar ejecutable (próximamente)

1. Descarga el archivo `.dmg` desde [Releases](../../releases)
2. Abre el `.dmg` y arrastra la aplicación a `/Applications`
3. Abre la aplicación (puede que necesites hacer click derecho → Abrir la primera vez)

### Opción 2: Desde el código fuente

```bash
# Clonar el repositorio
git clone https://github.com/Respawn84/dosbox-launcher-mac.git
cd dosbox-launcher-mac

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start
```

## 💡 Uso

### Primera configuración

1. Ejecuta la aplicación
2. Haz clic en "📁 Seleccionar Carpeta de Juegos"
3. Navega a tu carpeta de juegos de MS-DOS
4. El explorador mostrará todas las carpetas y ejecutables

### Lanzar un juego

- **Navegar**: Haz clic en las carpetas para expandir/colapsar
- **Ejecutar**: Doble clic en cualquier archivo `.exe` o `.com`

### Terminal MS-DOS libre

Para abrir una sesión libre de MS-DOS:

1. Haz clic en el botón **💻 Terminal MS-DOS** (verde) en el menú superior
2. Selecciona la carpeta que quieres montar como `C:`
3. DOSBox se abrirá en el prompt `C:\>` listo para tus comandos

**Casos de uso:**
- Ejecutar Windows 3.11: escribe `win` en el prompt
- Programar en QBasic: escribe `qbasic`
- Navegar por directorios: usa comandos clásicos (`dir`, `cd`, etc.)
- Experimentar con software antiguo sin lanzadores automáticos

## ⚙️ Configuración

### Editor de configuración de DOSBox

La aplicación incluye un editor integrado de archivos `.conf` de DOSBox.

**Acceso:** Click en "⚙️ Configuración DOSBox" en el menú superior

**Configuración por defecto:**
- Sound Blaster 16
- Teclado español
- Memoria: 16MB
- CPU: Pentium (3000 ciclos - optimizado para juegos de los 80s/90s)

### Múltiples perfiles

Puedes crear diferentes perfiles para juegos con requisitos específicos:

1. Abre el editor de configuración
2. Haz clic en **"+ Nuevo"**
3. Asigna un nombre al perfil
4. Modifica la configuración según necesites
5. Guarda los cambios

**Ejemplo de perfiles:**
- **Classic 80s**: Ciclos bajos (3000) para juegos antiguos como Digger
- **VGA 90s**: Ciclos medios (10000) para juegos VGA
- **Pentium**: Ciclos altos (20000) para juegos de mediados/finales de los 90s

### Ajuste de ciclos de CPU

Si experimentas problemas de audio o velocidad:

- **Juegos de los 80s** (CGA/EGA): `cycles=3000-5000`
- **Juegos de los 90s tempranos** (VGA): `cycles=10000-15000`
- **Juegos de los 90s tardíos**: `cycles=20000-30000`

## 🔨 Construcción del ejecutable

Para crear tu propio ejecutable standalone:

```bash
# Instalar dependencias
npm install

# Crear DMG instalable (recomendado)
npm run build:dmg

# O crear solo el .app
npm run build:dir
```

Los archivos generados estarán en la carpeta `dist/`.

📖 **Guía completa:** Ver [BUILD.md](BUILD.md)

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor lee [CONTRIBUTING.md](CONTRIBUTING.md) para más detalles.

### Cómo contribuir

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Estructura del proyecto

```
dosbox-launcher-mac/
├── main.js              # Proceso principal de Electron
├── renderer.js          # Lógica de la interfaz
├── index.html           # Estructura HTML
├── styles.css           # Estilos
├── package.json         # Configuración del proyecto
├── README.md            # Este archivo
├── BUILD.md             # Guía de construcción
├── CONTRIBUTING.md      # Guía de contribución
├── LICENSE              # Licencia MIT
└── .gitignore           # Archivos ignorados por Git
```

## 📋 Notas

- Los archivos `.DS_Store` se ignoran automáticamente
- Los directorios se muestran antes que los archivos
- La configuración se guarda en `~/Library/Application Support/dosbox-launcher/`
- El lanzador es compatible con cualquier versión de DOSBox para macOS

## 🐛 Problemas conocidos

Ninguno por el momento. Si encuentras algún bug, por favor abre un [issue](../../issues).

## 📜 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👤 Autor

**Daniel** - Desarrollador y entusiasta del retrogaming

## 🙏 Agradecimientos

- A la comunidad de DOSBox por mantener vivo el software clásico
- A Electron por facilitar el desarrollo multiplataforma
- A todos los retrogamers que mantienen viva la nostalgia

---

<div align="center">

**¿Te gusta este proyecto?** Dale una ⭐️

Hecho con ❤️ para la comunidad retrogaming

</div>
