import { fetchGraphQL } from "@/lib/graphql/client";
import { GET_PAGE_BY_SLUG } from "@/lib/graphql/queries/pages";
import PageTemplate from "@/components/ui/PageTemplate";
import { notFound } from "next/navigation";

interface PageData {
  page: {
    id: string;
    title: string;
    slug: string;
    content: string;
  } | null;
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  console.log("Slug ricevuto:", slug);

  const data = await fetchGraphQL<PageData>(GET_PAGE_BY_SLUG, { slug });

  if (!data?.page) {
    notFound();
  }

  return (
    <PageTemplate
      title={data.page.title}
      content={data.page.content}
    />
  );
}