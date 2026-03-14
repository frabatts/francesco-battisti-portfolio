import { fetchGraphQL } from "@/lib/graphql/client";
import { GET_ALL_PROGETTI } from "@/lib/graphql/queries/progetti";
import HomeClient from "@/components/ui/HomeClient";
import type { Progetto } from "@/types/wordpress";

interface ProgettiData {
  progetti: {
    nodes: Progetto[];
  };
}

export default async function HomePage() {
  const data = await fetchGraphQL<ProgettiData>(GET_ALL_PROGETTI, undefined, 3600);
  const progetti = data?.progetti?.nodes ?? [];

  return <HomeClient progetti={progetti} />;
}