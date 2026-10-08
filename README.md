# ✨ QR Fácil | Generador de códigos QR

**Herramienta web gratuita · Proyecto de portfolio de [Soyfacuh](https://soyfacuh.com/)**

QR Fácil es una aplicación web para crear, personalizar y descargar códigos QR desde el navegador. Su propuesta combina una interfaz moderna, un editor práctico y un motor de generación local, sin cuentas de usuario ni procesos de instalación.

El proyecto fue desarrollado como una **demostración funcional de diseño y desarrollo web** para el portfolio de Soyfacuh. También puede utilizarse como herramienta real para generar QR estáticos.

> **Aviso:** Esta web es una herramienta gratuita y un proyecto de portfolio. Los datos de los ejemplos son ilustrativos. Los códigos QR generados son **estáticos**: una vez descargados o impresos, su contenido no se actualiza automáticamente. No se gestionan enlaces dinámicos, estadísticas de escaneo, cuentas, alojamientos de imágenes ni pagos.

## 🎯 Objetivo

Mostrar una aplicación web moderna y útil que refleje capacidades de desarrollo frontend, diseño responsive, experiencia de usuario y procesamiento de información en el navegador.

La interfaz está pensada para usarse desde computadora, tablet o celular, con una navegación clara y sin funciones artificiales.

## 🧩 Funcionalidades

### Nueve tipos de códigos QR

| Tipo | Utilidad |
| --- | --- |
| **Enlace** | Abrir páginas web o perfiles online. |
| **Texto** | Compartir notas e información. |
| **WhatsApp** | Iniciar una conversación con un mensaje precargado. |
| **Wi-Fi** | Compartir los datos de conexión de una red. |
| **Email** | Redactar un correo con destinatario, asunto y mensaje. |
| **Teléfono** | Preparar una llamada desde un dispositivo compatible. |
| **Contacto** | Crear una ficha vCard para guardar datos de contacto. |
| **Imagen** | Abrir la URL pública de una imagen alojada en internet. |
| **Ubicación** | Compartir coordenadas geográficas. |

### Diseño y personalización

- Vista previa en vivo mientras se completan los datos.
- Colores personalizados para el código y su fondo.
- Cuatro combinaciones visuales predeterminadas.
- Estilos de módulos: **cuadrado, suave y puntos**.
- Resoluciones de exportación: **256, 512, 1024 y 2048 píxeles**.
- Niveles de corrección de errores **L, M, Q y H**.
- Aviso visual cuando el contraste de colores es bajo.
- Nombre de archivo personalizable.
- Zona de seguridad alrededor del QR para favorecer su lectura.

### Compartir y exportar

- Descarga **PNG** para uso digital y publicaciones.
- Descarga **SVG** vectorial para impresión y diseño.
- Copia del contenido codificado.
- Compartir PNG usando las funciones nativas del dispositivo cuando están disponibles; en caso contrario, se descarga el archivo.
- Versión limpia para imprimir desde el navegador.
- Botón para probar un ejemplo en cada modalidad.
- Reinicio del editor y mensajes de validación claros.

## 🎨 Diseño y experiencia de usuario

La identidad visual combina colores claros, verdes suaves, tarjetas con profundidad y pequeños elementos tridimensionales. El diseño busca mantener el foco en la tarea principal: **crear un QR sin distraer al usuario**.

Incluye navegación por teclado, textos de apoyo, controles accesibles y distribución adaptable a pantallas pequeñas. También incorpora una identificación discreta del desarrollador con un enlace a **[soyfacuh.com](https://soyfacuh.com/)**.

## 🔒 Privacidad y funcionamiento

- La creación del QR ocurre **en el dispositivo del usuario**.
- No se necesita una cuenta, base de datos ni backend.
- No se almacenan formularios en el servidor ni en `localStorage`.
- No se utilizan CDNs, fuentes externas, APIs de generación ni servicios de terceros para construir los QR.
- Mientras la página permanece abierta, los formularios pueden conservar temporalmente los datos entre pestañas del editor. Al recargar, se pierden.
- Los propios QR **pueden contener información sensible**, especialmente los de Wi-Fi o contactos. Compartilos únicamente con personas de confianza.

## 🛠️ Tecnologías utilizadas

- **HTML5:** estructura semántica, metadatos y accesibilidad.
- **CSS3:** interfaz responsive, microinteracciones y modo impresión.
- **JavaScript Vanilla:** validación, generación, exportación y estado de la interfaz.
- **Canvas API y SVG:** representación del código QR en formatos raster y vectorial.
- **Motor QR local:** adaptación del proyecto QRCode / qrcode-terminal; ver `THIRD-PARTY-NOTICES.md`.

No requiere React, Node.js, npm, Vite ni servicios externos.

## 📂 Estructura del proyecto

```text
QR-Facil/
├── index.html
├── styles.css
├── script.js
├── favicon.svg
├── README.md
├── THIRD-PARTY-NOTICES.md
└── assets/
    └── vendor/
        ├── qr-engine.js
        └── LICENSE-APACHE-2.0.txt
```

Los archivos HTML, CSS y JavaScript están **separados, indentados y sin minificar** para facilitar su lectura y mantenimiento. El motor QR se incluye como archivo local dentro de `assets/vendor/`.

## 🚀 Cómo abrir el proyecto en Visual Studio Code

1. Descargá el ZIP y extraé su contenido.
2. Abrí **Visual Studio Code**.
3. Seleccioná **Archivo → Abrir carpeta** y elegí `QR-Facil`.
4. Abrí `index.html`.
5. Hacé clic en **Go Live** (extensión Live Server). También podés abrir directamente `index.html` en tu navegador.

**Importante:** Abrí la carpeta del proyecto, no el ZIP. No es necesario ejecutar comandos ni instalar dependencias.

## 🌐 Publicación en GitHub Pages

1. Subí **el contenido de la carpeta** a la raíz de un repositorio de GitHub, dejando `index.html` en esa raíz.
2. En el repositorio, ingresá a **Settings → Pages**.
3. En **Build and deployment**, seleccioná **Deploy from a branch**.
4. Elegí `main` y la carpeta `/ (root)`, y guardá los cambios.
5. Esperá a que GitHub Pages publique el sitio.

**Demo del repositorio original:** [QR Fácil · QR-FREE](https://soyfacuh.github.io/QR-FREE/)

> Si se utiliza **otro nombre de repositorio o dominio**, actualizá las etiquetas `canonical`, `og:url` y el `url` del dato estructurado en `index.html` para que apunten a la nueva dirección pública. Las rutas de CSS, JavaScript y favicon son relativas para que funcionen en subdirectorios de GitHub Pages.

## 🔎 SEO y buenas prácticas

- Título y descripción orientados a búsquedas relacionadas con códigos QR gratuitos.
- Etiquetas Open Graph para compartir el sitio.
- URL canónica y datos estructurados `WebApplication`.
- Contenido informativo sobre QR, Wi-Fi, WhatsApp y formatos de exportación.
- Diseño adaptable y compatibilidad con preferencias de movimiento reducido.
- Funcionalidad principal sin recursos externos.

## ⚠️ Limitaciones técnicas

Los lectores de QR dependen de la cámara, el contraste, la resolución, la densidad del contenido y el soporte del dispositivo. El estilo con puntos y las combinaciones de bajo contraste pueden reducir la facilidad de escaneo, especialmente en códigos muy densos. **Probá siempre el QR antes de imprimirlo o distribuirlo.**

La página no transforma un QR estático en dinámico ni aloja imágenes. Un QR de imagen solo abre una URL existente. La opción de compartir puede variar según el navegador y la plataforma.

## 👨‍💻 Desarrollo

**Diseñado y desarrollado por [Soyfacuh](https://soyfacuh.com/)**  
Desarrollo web · Diseño de interfaces · Marketing digital

Este proyecto forma parte de la colección de demostraciones y herramientas web utilizadas para presentar servicios de desarrollo a potenciales clientes.

---

**QR Fácil** · Una herramienta útil, simple y profesional. Hecha por **[Soyfacuh](https://soyfacuh.com/)**.
