import { fetchGraphQL } from "@/lib/graphql/client";
import { GET_ALL_PAGES } from "@/lib/graphql/queries/pages";
import HomeClient from "@/components/ui/HomeClient";

interface Page {
  id: string;
  title: string;
  slug: string;
}

interface PagesData {
  pages: {
    nodes: Page[];
  };
}

export default async function HomePage() {
  const data = await fetchGraphQL<PagesData>(GET_ALL_PAGES);
  const pages = data?.pages?.nodes ?? [];

  return <HomeClient pages={pages} />;
}