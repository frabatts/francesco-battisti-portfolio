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
    page(id: $slug, idType: SLUG) {
      id
      title
      slug
      content
      featuredImage {
        node {
          sourceUrl
          altText
          width
          height
        }
      }
    }
  }
`;