import { fetchGraphQL } from "@/lib/graphql/client";
import { GET_PROGETTO_BY_SLUG } from "@/lib/graphql/queries/progetti";
import { notFound } from "next/navigation";
import ProgettoDetail from "@/components/ui/ProgettoDetail";
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

interface ProgettoData {
  progetto: {
    id: string;
    title: string;
    slug: string;
    content: string;
    featuredImage?: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    };
    dettagliProgetto: {
      categoria: string;
      anno: number;
      descrizioneBreve: string;
      urlProgetto: string;
    };
    seo: SEO;
  } | null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchGraphQL<ProgettoData>(GET_PROGETTO_BY_SLUG, { slug });

  if (!data?.progetto) return { title: "Progetto non trovato" };

  const { seo, dettagliProgetto, title } = data.progetto;

  return {
    title: seo?.title || title,
    description: seo?.description || dettagliProgetto.descrizioneBreve,
    alternates: {
      canonical: seo?.canonicalUrl,
    },
    openGraph: {
      title: seo?.openGraph?.title || title,
      description: seo?.openGraph?.description || dettagliProgetto.descrizioneBreve,
      type: "website",
      images: data.progetto.featuredImage
        ? [{ url: data.progetto.featuredImage.node.sourceUrl }]
        : [],
    },
  };
}

export default async function ProgettoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await fetchGraphQL<ProgettoData>(GET_PROGETTO_BY_SLUG, { slug });

  if (!data?.progetto) notFound();

  return <ProgettoDetail progetto={data.progetto} />;
}