import { fetchGraphQL } from "@/lib/graphql/client";
import { GET_ALL_PAGES } from "@/lib/graphql/queries/pages";
import { GET_ALL_POSTS } from "@/lib/graphql/queries/posts";
import { GET_ALL_PROGETTI } from "@/lib/graphql/queries/progetti";
import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

interface PagesData {
  pages: { nodes: { slug: string }[] };
}

interface PostsData {
  posts: { nodes: { slug: string; date: string }[] };
}

interface ProgettiData {
  progetti: { nodes: { slug: string }[] };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pagesData, postsData, progettiData] = await Promise.all([
    fetchGraphQL<PagesData>(GET_ALL_PAGES),
    fetchGraphQL<PostsData>(GET_ALL_POSTS),
    fetchGraphQL<ProgettiData>(GET_ALL_PROGETTI),
  ]);

  const pages = pagesData?.pages?.nodes ?? [];
  const posts = postsData?.posts?.nodes ?? [];
  const progetti = progettiData?.progetti?.nodes ?? [];

  const pageRoutes = pages.map((page) => ({
    url: `${BASE_URL}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const postRoutes = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const progettiRoutes = progetti.map((progetto) => ({
    url: `${BASE_URL}/progetti/${progetto.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/progetti`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...pageRoutes,
    ...postRoutes,
    ...progettiRoutes,
  ];
}