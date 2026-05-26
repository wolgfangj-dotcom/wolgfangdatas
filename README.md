# Seguimiento de Escuela

Esta carpeta contiene una aplicación de gestión de escuelas en un único archivo HTML estático.

## Archivos principales

- `index.html` - Página principal para desplegar en Netlify.
- `Registro y control de escuelas.html` - Archivo original con el mismo contenido.
- `respaldo_ld_2026-05-13.json` - Copia de respaldo de datos.

## Repositorio GitHub

- `https://github.com/wolgfangj-dotcom/wolgfangdatas`
- Rama principal: `master`

## Variables de entorno necesarias en Netlify

Agrega estas variables en los ajustes del sitio de Netlify (`Site settings` → `Build & deploy` → `Environment`):

- `GITHUB_TOKEN`: un token personal de GitHub con permiso `repo`.
- `GITHUB_REPOSITORY`: tu repositorio en formato `usuario/repositorio`, por ejemplo `wolgfangj-dotcom/wolgfangdatas`.
- `GITHUB_BRANCH`: rama donde se guarda el archivo (`master` por defecto).
- `GITHUB_DATA_PATH`: ruta del archivo JSON que se lee/escribe en GitHub (`respaldo_ld_2026-05-13.json` por defecto).

Con esto, la aplicación podrá guardar y cargar el archivo de datos directamente desde GitHub usando Netlify Functions.

## Pasos para desplegar en Netlify

1. Crea un repositorio en GitHub e inicializa tu proyecto allí.
2. Sube los archivos del directorio `Seguimiento de escuela` a ese repositorio.
3. En Netlify, crea un nuevo sitio y selecciona "Import from GitHub".
4. Elige el repositorio y la rama principal (`main` o `master`).
5. En los ajustes de build, si Netlify lo solicita, configura:
   - Build command: (dejar vacío)
   - Publish directory: `.`
6. Despliega el sitio.

7. En Netlify, después de conectar el repositorio, ve a `Site settings` → `Build & deploy` → `Environment` y agrega las variables de entorno necesarias.

> Netlify sirve automáticamente `index.html` como la página principal.

## Cómo probar localmente

1. Abre `index.html` en un navegador.
2. El sitio se ejecuta como una app estática, y los datos se guardan en `localStorage`.

## Notas

- Este proyecto actualmente no tiene backend.
- GitHub se usa para almacenar el código fuente.
- Netlify se usa para servir el front-end como sitio estático.
