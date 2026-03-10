import { fetchGraphQL } from "@/lib/graphql/client";
import { GET_ALL_PROGETTI } from "@/lib/graphql/queries/progetti";
import ProgettiClient from "@/components/ui/ProgettiClient";

interface Progetto {
  id: string;
  title: string;
  slug: string;
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
}

interface ProgettiData {
  progetti: {
    nodes: Progetto[];
  };
}

export default async function ProgettiPage() {
  const data = await fetchGraphQL<ProgettiData>(GET_ALL_PROGETTI);
  const progetti = data?.progetti?.nodes ?? [];

  return <ProgettiClient progetti={progetti} />;
}