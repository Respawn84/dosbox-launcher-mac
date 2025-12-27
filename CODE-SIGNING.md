# 🔐 Configuración de Firma de Código (Code Signing)

## ✅ Estado actual: CONFIGURADO

Tu aplicación ahora está configurada para **firmarse automáticamente** con tu certificado de Developer ID.

### Certificado configurado:
```
Developer ID Application: TECNAX TECNOLOGIAS SL (CGWKGZ4SV7)
```

## 🚀 Cómo usar

Simplemente compila como siempre:

```bash
npm run build:dmg
```

Electron-builder automáticamente:
1. ✅ Firmará la aplicación con tu certificado
2. ✅ Aplicará Hardened Runtime
3. ✅ Configurará los entitlements necesarios

## 🎯 Resultado

Tus usuarios **ya NO verán** el error "La aplicación está dañada". Podrán:
- Descargar el .dmg
- Instalarlo normalmente
- Abrirlo directamente sin comandos ni trucos

**Pero sí verán un aviso la primera vez**: "macOS no puede verificar que esta app esté libre de malware"

Para eliminar este último aviso también, necesitas **notarizar** (ver más abajo).

## 📋 Archivos añadidos

- `build/entitlements.mac.plist` - Permisos necesarios para Electron
- `package.json` - Configuración de firma actualizada

## 🔒 Notarización (Opcional - Nivel 2)

Si quieres eliminar **todos** los avisos de seguridad, necesitas notarizar la app con Apple.

### Requisitos para notarizar:
1. ✅ Certificado Developer ID (ya lo tienes)
2. ❓ Apple ID
3. ❓ App-specific password
4. ❓ Team ID: `CGWKGZ4SV7`

### Configuración para notarización

Si decides hacerlo, añade estas variables de entorno:

```bash
export APPLE_ID="tu-email@ejemplo.com"
export APPLE_APP_SPECIFIC_PASSWORD="xxxx-xxxx-xxxx-xxxx"
export APPLE_TEAM_ID="CGWKGZ4SV7"
```

Y actualiza `package.json`:

```json
"afterSign": "scripts/notarize.js",
"notarize": {
  "teamId": "CGWKGZ4SV7"
}
```

**¿Vale la pena?**
- Para distribución personal/pequeña: **NO necesario**
- Para distribución comercial/amplia: **Recomendado**

## 🧪 Verificar firma

Después de compilar, verifica que esté firmado:

```bash
codesign -dv --verbose=4 "dist/mac/DOSBox Launcher.app"
```

Deberías ver:
```
Authority=Developer ID Application: TECNAX TECNOLOGIAS SL (CGWKGZ4SV7)
Authority=Developer ID Certification Authority
Authority=Apple Root CA
```

## 🔄 Actualizar GitHub

Ahora puedes actualizar la documentación del Release eliminando las instrucciones del error "dañado", ya que no será necesario.

### Nuevo texto para el Release:

```markdown
## 📦 Instalación

1. Descarga el archivo .dmg apropiado para tu Mac
2. Abre el .dmg
3. Arrastra "DOSBox Launcher.app" a Applications
4. ¡Listo! Abre la app normalmente

**Nota**: La primera vez puede aparecer un aviso de seguridad. 
Haz click en "Abrir" para confirmar.
```

## ⚠️ Problemas comunes

### "No se puede verificar la identidad del desarrollador"
- Verifica que el certificado esté instalado: `security find-identity -v -p codesigning`
- Verifica que esté en el llavero "login", no en "System"

### "El certificado ha caducado"
- Los certificados caducan cada año
- Renueva en https://developer.apple.com/account/resources/certificates/list
- Descarga e instala el nuevo certificado

## 📚 Más información

- [Apple Code Signing Guide](https://developer.apple.com/library/archive/documentation/Security/Conceptual/CodeSigningGuide/)
- [electron-builder Code Signing](https://www.electron.build/code-signing)
- [Notarizing macOS Software](https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution)

---

**Resumen**: Tu app ahora está firmada profesionalmente. Los usuarios tendrán una experiencia mucho mejor. 🎉
