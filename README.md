# Seguimiento de Escuela

Esta carpeta contiene una aplicación de gestión de escuelas en un único archivo HTML estático.

## Archivos principales

- `index.html` - Página principal para desplegar en Netlify.
- `Registro y control de escuelas.html` - Archivo original con el mismo contenido.
- `respaldo_ld_2026-05-13.json` - Copia de respaldo de datos.

## Pasos para desplegar en Netlify

1. Crea un repositorio en GitHub e inicializa tu proyecto allí.
2. Sube los archivos del directorio `Seguimiento de escuela` a ese repositorio.
3. En Netlify, crea un nuevo sitio y selecciona "Import from GitHub".
4. Elige el repositorio y la rama principal (`main` o `master`).
5. En los ajustes de build, si Netlify lo solicita, configura:
   - Build command: (dejar vacío)
   - Publish directory: `.`
6. Despliega el sitio.

> Netlify sirve automáticamente `index.html` como la página principal.

## Cómo probar localmente

1. Abre `index.html` en un navegador.
2. El sitio se ejecuta como una app estática, y los datos se guardan en `localStorage`.

## Notas

- Este proyecto actualmente no tiene backend.
- GitHub se usa para almacenar el código fuente.
- Netlify se usa para servir el front-end como sitio estático.
