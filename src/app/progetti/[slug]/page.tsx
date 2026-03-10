import { fetchGraphQL } from "@/lib/graphql/client";
import { GET_PROGETTO_BY_SLUG } from "@/lib/graphql/queries/progetti";
import { notFound } from "next/navigation";
import ProgettoDetail from "@/components/ui/ProgettoDetail";

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
  } | null;
}

export default async function ProgettoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await fetchGraphQL<ProgettoData>(GET_PROGETTO_BY_SLUG, { slug });

  if (!data?.progetto) {
    notFound();
  }

  return <ProgettoDetail progetto={data.progetto} />;
}