import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog");
  return rss({
    title: "ChequeAR Blog – Cheques en Argentina",
    description:
      "Guías, artículos y respuestas sobre cheques, verificación y riesgos en Argentina.",
    site: context.site!.toString(),
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.description,
      link: `/blog/${post.data.slug}/`,
    })),
    customData: `<language>es-ar</language>`,
  });
}
