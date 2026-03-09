export const GET_ALL_POSTS = `
  query GetAllPosts {
    posts {
      nodes {
        id
        title
        slug
        excerpt
        date
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
  }
`;

export const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      slug
      content
      date
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