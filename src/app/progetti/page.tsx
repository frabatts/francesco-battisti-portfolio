import { fetchGraphQL } from "@/lib/graphql/client";
import { GET_ALL_PROGETTI } from "@/lib/graphql/queries/progetti";
import ProgettiClient from "@/components/ui/ProgettiClient";
import type { Progetto } from "@/types/wordpress";

interface ProgettiData {
  progetti: {
    nodes: Progetto[];
  };
}

export default async function ProgettiPage() {
  const data = await fetchGraphQL<ProgettiData>(GET_ALL_PROGETTI, undefined, 3600);
  const progetti = data?.progetti?.nodes ?? [];

  return <ProgettiClient progetti={progetti} />;
}