import { fetchGraphQL } from "@/lib/graphql/client";
import { GET_PAGE_BY_SLUG } from "@/lib/graphql/queries/pages";
import PageTemplate from "@/components/ui/PageTemplate";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface SEO {
  title: string;
  description: string;
  canonicalUrl: string;
  openGraph: {
    title: string;
    description: string;
  };
}

interface PageData {
  page: {
    id: string;
    title: string;
    slug: string;
    content: string;
    seo: SEO;
  } | null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchGraphQL<PageData>(GET_PAGE_BY_SLUG, { slug });

  if (!data?.page) return { title: "Pagina non trovata" };

  const { seo } = data.page;

  return {
    title: seo?.title || data.page.title,
    description: seo?.description,
    alternates: {
      canonical: seo?.canonicalUrl,
    },
    openGraph: {
      title: seo?.openGraph?.title || data.page.title,
      description: seo?.openGraph?.description,
      type: "website",
    },
  };
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await fetchGraphQL<PageData>(GET_PAGE_BY_SLUG, { slug });

  if (!data?.page) notFound();

  return (
    <PageTemplate
      title={data.page.title}
      content={data.page.content}
    />
  );
}