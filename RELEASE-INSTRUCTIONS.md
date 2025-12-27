# Instrucciones para el Release de GitHub

## Texto para poner en la descripción del Release v1.0.0

```markdown
## 🎮 DOSBox Launcher v1.0.0

Primera versión pública de DOSBox Launcher para macOS - Frontend moderno para ejecutar juegos MS-DOS con terminal integrada.

### ✨ Características

- 🎮 Explorador de juegos con árbol de directorios
- 💻 Terminal MS-DOS libre para Windows 3.11, QBasic o explorar DOS
- ⚙️ Editor de configuración DOSBox integrado
- 💾 Múltiples perfiles de configuración
- 🚀 Lanzamiento rápido con doble clic en ejecutables
- 📁 Filtrado automático de .exe y .com

### 📦 Descarga e Instalación

**1. Elige tu versión:**
- **Apple Silicon (M1/M2/M3/M4)**: Descarga `DOSBox-Launcher-1.0.0-arm64.dmg` ⬇️
- **Intel**: Descarga `DOSBox-Launcher-1.0.0-x64.dmg` ⬇️

**2. Instala:**
- Abre el archivo .dmg
- Arrastra "DOSBox Launcher.app" a tu carpeta Applications

**3. ⚠️ IMPORTANTE - Primera vez:**

macOS mostrará el error **"DOSBox Launcher está dañado..."** porque la app no está firmada con certificado de Apple Developer.

**Solución rápida (Terminal):**
```bash
xattr -cr "/Applications/DOSBox Launcher.app"
```

**O usando interfaz gráfica:**
1. Click derecho en la app → "Abrir"
2. En el diálogo de seguridad → Click "Abrir" de nuevo
3. ¡Listo! Ya puedes usar la app normalmente

### 📋 Requisitos

- ✅ macOS 10.13 (High Sierra) o superior
- ✅ DOSBox instalado en `/Applications/dosbox.app/`
  - Descarga DOSBox desde: https://www.dosbox.com/

### 📖 Documentación

- [README completo](https://github.com/TU_USUARIO/dosbox-launcher-mac#readme)
- [Guía de uso](https://github.com/TU_USUARIO/dosbox-launcher-mac#-uso)
- [Configuración](https://github.com/TU_USUARIO/dosbox-launcher-mac#%EF%B8%8F-configuración)

### 🐛 Problemas conocidos

- **"La aplicación está dañada"**: Sigue las instrucciones anteriores
- **No encuentra DOSBox**: Asegúrate de que DOSBox esté en `/Applications/dosbox.app/`

### 💬 Feedback

¿Encuentras algún problema? [Abre un issue](https://github.com/TU_USUARIO/dosbox-launcher-mac/issues)

---

**Nota**: Esta aplicación es de código abierto y completamente gratuita. No requiere registro ni conexión a internet.
```

## Assets a subir

Arrastra estos archivos a la sección "Assets" del Release:
- `DOSBox Launcher-1.0.0-arm64.dmg`
- `DOSBox Launcher-1.0.0-x64.dmg` (si lo tienes)

## Configuración del Release

- **Tag version**: `v1.0.0`
- **Release title**: `DOSBox Launcher v1.0.0`
- **Marcar como**: ✅ Latest release
- **Pre-release**: ❌ No marcar

## Después de publicar

Actualiza el README.md cambiando:
```markdown
### Opción 1: Descargar ejecutable (próximamente)
```

Por:
```markdown
### Opción 1: Descargar ejecutable
```
