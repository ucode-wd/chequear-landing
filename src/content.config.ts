import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string().max(160),
    keyword: z.string().optional(),
    category: z.enum(['pilar', 'educativo', 'long-tail']),
    cluster: z.enum([
      'cheque-rechazado',
      'verificar-cheque',
      'cheque-pago-diferido',
      'riesgo-cheques',
      'consulta-emisor',
      'cheque-sin-fondos',
    ]).optional(),
    tags: z.array(z.string()).optional(),
    date: z.string().optional(),
    
    // Nuevos campos programáticos y de riesgo
    nivelRiesgo: z.enum(['bajo', 'medio', 'alto']).optional(),
    normativaAplicable: z.string().optional(),
    multaEstimada: z.string().optional(),
    solucionChequear: z.boolean().optional(),
    
    // Nuevos campos obligatorios para señales E-E-A-T y YMYL
    fechaVerificacion: z.coerce.date(),
    tipoEsquema: z.enum(['faq', 'howto', 'article']),
    
    // Estructura de FAQs para rich snippets
    preguntasFrecuentes: z.array(z.object({
      pregunta: z.string(),
      respuesta: z.string()
    })).optional(),
    
    // E-E-A-T Autoría
    author: z.string().optional(),
    reviewedBy: z.string().optional()
  }),
});

export const collections = { blog };
