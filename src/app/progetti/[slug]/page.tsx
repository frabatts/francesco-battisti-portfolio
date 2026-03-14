import { fetchGraphQL } from "@/lib/graphql/client";
import { GET_PROGETTO_BY_SLUG, GET_ALL_PROGETTI } from "@/lib/graphql/queries/progetti";
import { notFound } from "next/navigation";
import ProgettoDetail from "@/components/ui/ProgettoDetail";
import type { Metadata } from "next";
import type { ProgettoFull } from "@/types/wordpress";

interface ProgettoData {
  progetto: ProgettoFull | null;
}

interface AllProgettiData {
  progetti: {
    nodes: { slug: string }[];
  };
}

export async function generateStaticParams() {
  const data = await fetchGraphQL<AllProgettiData>(GET_ALL_PROGETTI, undefined, 3600);
  return data?.progetti?.nodes.map((p) => ({ slug: p.slug })) ?? [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchGraphQL<ProgettoData>(GET_PROGETTO_BY_SLUG, { slug }, 3600);

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
  const data = await fetchGraphQL<ProgettoData>(GET_PROGETTO_BY_SLUG, { slug }, 3600);

  if (!data?.progetto) notFound();

  return <ProgettoDetail progetto={data.progetto} />;
}