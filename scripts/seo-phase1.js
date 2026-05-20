import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');
const ARCHIVAL_DIR = path.join(BLOG_DIR, '_archived');

// 1. Definir los Hubs y los patrones (regex o keywords) de las URLs que van a cada Hub.
// Además de agrupar, definiremos un nuevo "slug" único y robusto por Hub.
const HUBS = {
  'guia-aceptacion-cheques': {
    title: 'Guía de Aceptación de Cheques: Riesgos y Verificaciones',
    keywords: ['aceptar', 'verificar-cheque', 'verificar-fondos', 'firma-cheque', 'errores-aceptar', 'como-llenar'],
    oldFiles: []
  },
  'cheques-pago-diferido': {
    title: 'Cheques de Pago Diferido: Plazos, Tasas y Riesgos',
    keywords: ['diferido', '180', '90', '360', 'tasa', 'negociar-cheques'],
    oldFiles: []
  },
  'cheques-rechazados': {
    title: 'Cheques Rechazados: Causas, Consecuencias y Qué Hacer',
    keywords: ['rechaza', 'rebotado', 'multa-cheque', 'consultar-cheques'],
    oldFiles: []
  },
  'cheque-sin-fondos': {
    title: 'Cheques Sin Fondos: Guía Legal y Procedimientos',
    keywords: ['sin-fondos'],
    oldFiles: []
  },
  'cheques-extraviados-denunciados': {
    title: 'Cheques Denunciados o Extraviados',
    keywords: ['denuncia', 'extraviado', 'robado', 'cuenta-cerrada'],
    oldFiles: []
  },
  'endoso-de-cheques': {
    title: 'Guía Completa sobre Endoso de Cheques',
    keywords: ['endos', 'tercero', 'al-portador', 'no-a-la-orden'],
    oldFiles: []
  },
  'echeq-electronico': {
    title: 'ECHEQ: Qué es y cómo funciona el Cheque Electrónico',
    keywords: ['echeq'],
    oldFiles: []
  }
};

// Asegurar que exista el directorio de archivado
if (!fs.existsSync(ARCHIVAL_DIR)) {
  fs.mkdirSync(ARCHIVAL_DIR, { recursive: true });
}

// 2. Leer archivos en la carpeta de blog
const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.mdx'));

let unmappedFiles = [];

for (const file of files) {
  let mapped = false;
  // Intentar mapear según keywords
  for (const [hubSlug, hubData] of Object.entries(HUBS)) {
    if (hubData.keywords.some(kw => file.includes(kw))) {
      hubData.oldFiles.push(file);
      mapped = true;
      break;
    }
  }
  if (!mapped) {
    // Si no mapeó a ninguno principal, lo enviamos genérico o "varios"
    unmappedFiles.push(file);
  }
}

// Para efectos de consolidación, ponemos los no mapeados en un hub genérico "guia-legal"
HUBS['guia-legal-cheques'] = {
  title: 'Guía Legal y Conceptual de Cheques en Argentina',
  keywords: [],
  oldFiles: unmappedFiles
};

// 3. Crear los redirect maps
const redirects = {};

// 4. Ejecutar el movimiento a Archival y crear el Hub temporal
for (const [hubSlug, hubData] of Object.entries(HUBS)) {
  if (hubData.oldFiles.length === 0) continue;

  const hubFilePath = path.join(BLOG_DIR, `${hubSlug}.mdx`);
  
  // Guardamos las URLs viejas (sin el .mdx) para el redirect
  hubData.oldFiles.forEach(oldFile => {
    const slug = oldFile.replace('.mdx', '');
    redirects[`/blog/${slug}`] = `/blog/${hubSlug}`;
    
    // Mover archivo a _archived
    const oldPath = path.join(BLOG_DIR, oldFile);
    const newPath = path.join(ARCHIVAL_DIR, oldFile);
    fs.renameSync(oldPath, newPath);
  });

  // Generar un mdx base (vacío pero con el frontmatter listo para la fase 2)
  const baseMdx = `---
title: "${hubData.title}"
slug: "${hubSlug}"
description: "Guía pilar completa que unifica información sobre ${hubData.title} para evitar thin content."
category: "pilar"
---

## ${hubData.title}

*Nota: Este es un Hub de consolidación SEO (Fase 1). 
Reemplaza contenido obsoleto de ${hubData.oldFiles.length} páginas iterativas.*

Aquí irá el contenido maestro y los componentes dinámicos de Astro en la Fase 2.
`;

  fs.writeFileSync(hubFilePath, baseMdx);
  console.log(`✅ Creado Hub: ${hubSlug}.mdx (Contiene ${hubData.oldFiles.length} posts canibalizados)`);
}

// 5. Modificar astro.config.mjs para inyectar los redirects
const configPath = path.join(process.cwd(), 'astro.config.mjs');
let configContent = fs.readFileSync(configPath, 'utf-8');

// Generar bloque de redirects amigable para el config
const redirectsStr = JSON.stringify(redirects, null, 4).replace(/"/g, "'");

if (!configContent.includes('redirects:')) {
  // Buscar dónde insertar (antes de las integrations)
  const replaceTarget = "integrations: [mdx(), sitemap()],";
  const injection = `redirects: ${redirectsStr},\n  integrations: [mdx(), sitemap()],`;
  
  configContent = configContent.replace(replaceTarget, injection);
  fs.writeFileSync(configPath, configContent);
  console.log("✅ Redirecciones inyectadas exitosamente en astro.config.mjs");
} else {
  console.log("ℹ️ astro.config.mjs ya contiene un bloque redirects, favor de verificar manualmente.");
  console.log("Redirects detectados:", redirectsStr);
}

console.log("\n🚀 Fase 1 completada con éxito. Archivos canibalizados archivados y Hubs creados.");
