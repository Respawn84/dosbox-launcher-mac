# Guía de Construcción del Ejecutable

Esta guía explica cómo crear un ejecutable standalone (.app) de DOSBox Launcher.

## Requisitos previos

- Node.js 18 o superior instalado
- macOS (el ejecutable es específico para Mac)
- Espacio en disco: ~300MB para el proceso de build

## Instalación de dependencias

```bash
cd /ruta/al/proyecto/Dosboxmac
npm install
```

Esto instalará:
- Electron (~200MB)
- electron-builder y sus dependencias

## Crear el ejecutable

### Opción 1: DMG instalable (recomendado)

Crea un archivo .dmg que puedes distribuir:

```bash
npm run build:dmg
```

El archivo .dmg se creará en la carpeta `dist/`:
- `DOSBox Launcher-1.0.0-arm64.dmg` (Apple Silicon)
- `DOSBox Launcher-1.0.0-x64.dmg` (Intel)

### Opción 2: ZIP comprimido

Crea un archivo .zip con la aplicación:

```bash
npm run build
```

### Opción 3: Solo el .app (para testing)

Crea solo la aplicación sin empaquetar:

```bash
npm run build:dir
```

La aplicación estará en `dist/mac/DOSBox Launcher.app`

## Ubicación de los archivos generados

Todos los archivos se generan en la carpeta `dist/`:

```
dist/
├── DOSBox Launcher-1.0.0-arm64.dmg
├── DOSBox Launcher-1.0.0-x64.dmg
└── mac/
    └── DOSBox Launcher.app
```

## Instalar el ejecutable

### Desde el DMG:
1. Abre el archivo .dmg
2. Arrastra "DOSBox Launcher.app" a la carpeta Applications
3. Abre desde Applications o Launchpad

### Desde el .app directo:
1. Copia `DOSBox Launcher.app` desde `dist/mac/` a `/Applications`
2. Primera vez: Click derecho → Abrir (por seguridad de macOS)

## Solución de problemas

### "La aplicación no se puede abrir porque proviene de un desarrollador no identificado"

**Solución:**
1. Click derecho en la aplicación
2. Selecciona "Abrir"
3. Click en "Abrir" en el diálogo de confirmación

O desde Terminal:
```bash
xattr -cr "/Applications/DOSBox Launcher.app"
```

### Error durante el build

Si encuentras errores durante `npm run build`, prueba:

```bash
# Limpiar cachés
rm -rf node_modules dist
npm install
npm run build
```

### El ejecutable es muy grande (~150MB)

Esto es normal. Electron incluye Chromium y Node.js completos para que la aplicación sea standalone. El tamaño se distribuye así:
- Electron framework: ~120MB
- Tu código: <1MB
- Dependencias: ~30MB

## Optimizaciones

El ejecutable ya incluye:
- ✅ Solo los archivos necesarios (configurado en package.json)
- ✅ Compilado para ambas arquitecturas (Intel y Apple Silicon)
- ✅ Sin recursos innecesarios

## Distribución

### Para compartir con otros:
1. Usa el archivo .dmg generado
2. Los usuarios solo necesitan:
   - macOS 10.13 o superior
   - DOSBox instalado en `/Applications/dosbox.app/`

### No necesitan:
- ❌ Node.js
- ❌ npm
- ❌ Git
- ❌ Ninguna dependencia adicional

## Actualizar la versión

Edita `package.json`:
```json
{
  "version": "1.1.0"
}
```

Luego reconstruye:
```bash
npm run build:dmg
```

## Tamaños aproximados

- **Proyecto fuente**: ~50KB
- **node_modules**: ~250MB
- **Ejecutable .app**: ~150MB
- **DMG comprimido**: ~60MB

## Notas adicionales

- El ejecutable funciona completamente offline
- No requiere conexión a internet
- Todos los archivos de configuración se guardan en:
  `~/Library/Application Support/dosbox-launcher/`

## ⚠️ Importante: Gatekeeper y aplicaciones no firmadas

**Problema**: Cuando los usuarios descargan el .dmg y lo instalan, macOS mostrará el error:
> "DOSBox Launcher está dañado y no se puede abrir. Deberías moverlo a la papelera."

**Causa**: La aplicación no está firmada con un certificado de Apple Developer (requiere pagar $99/año).

**Solución para usuarios**:

**Método 1 (Rápido - Terminal)**:
```bash
xattr -cr "/Applications/DOSBox Launcher.app"
```

**Método 2 (Interfaz gráfica)**:
1. Click derecho en la app → "Abrir"
2. En el diálogo → Click "Abrir" de nuevo

**Para desarrolladores**: Si quieres evitar este problema:
1. Únete al [Apple Developer Program](https://developer.apple.com/programs/) ($99/año)
2. Obtén un certificado de firma de código
3. Configura electron-builder para firmar la app automáticamente

**IMPORTANTE**: Incluye estas instrucciones en:
- El README.md (ya actualizado)
- La descripción del Release en GitHub (ver RELEASE-INSTRUCTIONS.md)
- Cualquier documentación que compartas
