# ✅ Solución al problema "La aplicación está dañada"

## 🔴 El Problema

Cuando un usuario descarga el .dmg de GitHub Releases y lo instala, macOS muestra:
> **"DOSBox Launcher está dañado y no se puede abrir. Deberías moverlo a la papelera."**

## 🔍 Por qué ocurre

Este NO es un error real. Es la forma que tiene macOS (Gatekeeper) de proteger a los usuarios de aplicaciones no firmadas:

1. La app **no está firmada** con un certificado de Apple Developer ($99/año)
2. macOS detecta que se descargó de internet
3. macOS aplica restricciones de seguridad extra
4. Muestra el mensaje de "dañado" (aunque no lo esté)

## ✅ Soluciones implementadas

### Para TUS USUARIOS (quienes descargan el .dmg):

**Opción 1 - Terminal (15 segundos):**
```bash
xattr -cr "/Applications/DOSBox Launcher.app"
```
Después abrir la app normalmente.

**Opción 2 - Interfaz gráfica (30 segundos):**
1. Click derecho en la app → "Abrir"
2. En el diálogo de seguridad → "Abrir" de nuevo
3. Listo, ya funciona para siempre

### Para TI (el desarrollador):

He actualizado toda la documentación para que los usuarios sepan qué hacer:

✅ **README.md** - Instrucciones claras en la sección de instalación
✅ **BUILD.md** - Explicación completa del problema
✅ **RELEASE-INSTRUCTIONS.md** - Texto listo para copiar/pegar en el Release de GitHub
✅ **QUICKSTART.md** - Advertencia incluida

## 📋 Checklist antes de publicar el Release

- [ ] Generar el .dmg con `npm run build:dmg`
- [ ] Crear el Release en GitHub
- [ ] Copiar la descripción desde `RELEASE-INSTRUCTIONS.md`
- [ ] Incluir las instrucciones sobre el error "dañado"
- [ ] Subir el .dmg como asset
- [ ] Publicar

## 🎯 Para evitar este problema en el futuro

Si quieres que tus usuarios NO vean este error, necesitas:

1. **Inscribirte en Apple Developer Program** ($99/año)
   - https://developer.apple.com/programs/

2. **Obtener certificado de firma de código**
   - Developer ID Application Certificate

3. **Configurar electron-builder** para firmar automáticamente
   - Añadir configuración de firma en `package.json`
   - Configurar variables de entorno con tus credenciales

**Sin certificado:** Los usuarios verán el error (pero con tus instrucciones lo solucionan en 15 segundos)
**Con certificado:** Los usuarios podrán abrir la app directamente sin problemas

## 💡 Recomendación

Para un proyecto de código abierto y gratuito como este:
- ✅ **Documentar bien el problema** (ya hecho)
- ✅ **Dar instrucciones claras** (ya hecho)
- ⚠️ **NO pagar $99/año** a menos que tengas muchos usuarios o quieras distribuir comercialmente

Los usuarios técnicos (tu público objetivo) están acostumbrados a este tipo de situaciones y no les molesta ejecutar un comando rápido.

## 🔄 Actualiza el Release actual

Si ya publicaste el Release sin las instrucciones:

1. Ve a tu Release en GitHub
2. Click en "Edit release"
3. Copia el texto de `RELEASE-INSTRUCTIONS.md`
4. Pégalo en la descripción
5. Guarda los cambios

Tus usuarios podrán ver las instrucciones y solucionar el problema.

## 📞 Soporte a usuarios

Si alguien reporta el problema:

**Respuesta rápida:**
```
Este mensaje es normal en macOS con apps no firmadas. 
Para solucionarlo ejecuta:

xattr -cr "/Applications/DOSBox Launcher.app"

Después ya puedes abrir la app normalmente. 
Más info: https://github.com/TU_USUARIO/dosbox-launcher-mac#instalación
```

---

**Resumen:** El problema está resuelto con documentación. Tus usuarios sabrán exactamente qué hacer y por qué. 🎉
