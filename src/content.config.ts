import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string().max(160),
    keyword: z.string(),
    category: z.enum(['pilar', 'educativo', 'long-tail']),
    cluster: z.enum([
      'cheque-rechazado',
      'verificar-cheque',
      'cheque-pago-diferido',
      'riesgo-cheques',
      'consulta-emisor',
      'cheque-sin-fondos',
    ]),
    tags: z.array(z.string()),
    date: z.string(),
  }),
});

export const collections = { blog };
