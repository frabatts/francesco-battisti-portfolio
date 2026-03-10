export const GET_ALL_PAGES = `
  query GetAllPages {
    pages {
      nodes {
        id
        title
        slug
        content
      }
    }
  }
`;

export const GET_PAGE_BY_SLUG = `
  query GetPageBySlug($slug: ID!) {
    page(id: $slug, idType: URI) {
      id
      title
      slug
      content
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      seo {
        title
        description
        canonicalUrl
        openGraph {
          title
          description
        }
      }
    }
  }
`;