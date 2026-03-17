# ChequeAR - Landing Page y Blog

Este repositorio contiene la landing page y el blog de **ChequeAR**, un proyecto desarrollado utilizando el framework [Astro](https://astro.build/). El objetivo principal de este sitio es atraer tráfico orgánico y dar a conocer la herramienta.

## Estrategia de SEO (SEO Programático)

Para lograr un gran alcance en los motores de búsqueda, en ChequeAR utilizamos una estrategia conocida como **SEO Programático (Programmatic SEO)**. ¿Cómo funciona esto de manera sencilla?

En lugar de sentarnos a escribir cada artículo del blog de forma individual:
1. **Base de palabras clave:** Tenemos una lista de términos que nuestros usuarios buscan frecuentemente en Google (ej. "cheques rechazados", "endoso de cheques", "qué significa CUIT inhabilitado").
2. **Plantillas de contenido:** Diseñamos estructuras (plantillas) con información valiosa, clara y estructurada para diferentes categorías de problemas.
3. **Generación automática:** Utilizamos un script interno (`scripts/generate-content.mjs`) que cruza las palabras clave con las plantillas y genera automáticamente cientos de artículos en formato Markdown (`.mdx`).
4. **Sitio estático ultrarrápido:** Astro se encarga de transformar todos esos archivos `.mdx` en páginas web ultrarrápidas. A Google le encantan las páginas rápidas y bien estructuradas, lo que nos ayuda a posicionarnos mejor.
5. **Red de enlaces (Interlinking):** Los artículos generados se enlazan estratégicamente entre sí y hacia nuestra página principal, creando una red de información que aumenta la "autoridad" de nuestro sitio web a los ojos de los buscadores.

**En resumen:** Generamos contenido de forma masiva e inteligente para responder a las dudas de las personas sobre cheques en Argentina, y al mismo tiempo les presentamos ChequeAR como la solución ideal.

## Comandos Útiles

Todos los comandos se ejecutan desde la raíz del proyecto en la terminal:

| Comando | Acción |
| :--- | :--- |
| \`npm install\` | Instala todas las dependencias necesarias. |
| \`npm run dev\` | Inicia el servidor de desarrollo local (generalmente en \`localhost:4321\`). |
| \`npm run build\` | Compila la versión optimizada para producción del sitio. |
| \`node scripts/generate-content.mjs\` | Ejecuta el script que genera automáticamente los artículos del blog. |

***
*Creado con Astro. ¡Listo para despegar! 🚀*
