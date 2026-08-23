# Vista previa de Vía Sostenible para GitHub Pages

Esta carpeta contiene una copia independiente de demostración. La versión para Hostinger y su formulario PHP permanecen fuera de esta carpeta.

## Publicar la demostración

1. Crea un repositorio nuevo en GitHub.
2. Sube **el contenido de esta carpeta** a la raíz del repositorio. `index.html` debe quedar en el primer nivel.
3. En GitHub, abre **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Selecciona la rama `main`, la carpeta `/ (root)` y guarda.
6. Espera a que GitHub muestre la dirección pública de la demostración.

Las rutas son relativas, por lo que funcionan en una dirección como `https://usuario.github.io/nombre-del-repositorio/` sin conocer de antemano el nombre del repositorio.

## Diferencias respecto de Hostinger

- El formulario conserva su diseño y validaciones, pero no envía información.
- No contiene PHP, configuración privada de correo ni `.htaccess`.
- Todas las páginas incluyen `noindex, nofollow` para pedir a los buscadores que no indexen la demostración. También se incluye un `robots.txt` como protección adicional.
- El botón de WhatsApp sí funciona porque abre un servicio externo.

## Importante

No copies estos archivos encima de la versión para Hostinger. Cuando se contrate el alojamiento, utiliza `via-sostenible-hostinger.zip`, que conserva el procesamiento PHP.
