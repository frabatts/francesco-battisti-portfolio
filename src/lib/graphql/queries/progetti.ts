export const GET_ALL_PROGETTI = `
  query GetAllProgetti {
    progetti {
      nodes {
        id
        title
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        dettagliProgetto {
          categoria
          anno
          descrizioneBreve
          urlProgetto
        }
      }
    }
  }
`;

export const GET_PROGETTO_BY_SLUG = `
  query GetProgettoBySlug($slug: ID!) {
    progetto(id: $slug, idType: URI) {
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
      dettagliProgetto {
        categoria
        anno
        descrizioneBreve
        urlProgetto
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