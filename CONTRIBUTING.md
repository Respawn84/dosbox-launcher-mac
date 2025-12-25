# Contribuir a DOSBox Launcher

¡Gracias por tu interés en contribuir! Este proyecto es un frontend simple y efectivo para DOSBox en macOS.

## Cómo contribuir

### Reportar bugs

Si encuentras un bug, por favor abre un issue con:
- Descripción clara del problema
- Pasos para reproducirlo
- Versión de macOS
- Versión de DOSBox instalada

### Proponer mejoras

Las sugerencias son bienvenidas. Abre un issue describiendo:
- La mejora propuesta
- El caso de uso
- Si es posible, un ejemplo de implementación

### Pull Requests

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Añade nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## Código de Conducta

- Sé respetuoso con otros contribuidores
- Enfócate en el código, no en las personas
- Acepta críticas constructivas

## Desarrollo local

```bash
npm install
npm start
```

## Estructura del proyecto

- `main.js` - Proceso principal de Electron (backend)
- `renderer.js` - Lógica de la interfaz (frontend)
- `index.html` - Estructura HTML
- `styles.css` - Estilos CSS

## Estilo de código

- Usa indentación de 4 espacios
- Comenta código complejo
- Usa nombres descriptivos para variables y funciones
- Mantén las funciones pequeñas y enfocadas
