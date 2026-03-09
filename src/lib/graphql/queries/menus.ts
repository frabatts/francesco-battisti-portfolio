export const GET_PRIMARY_MENU = `
  query GetPrimaryMenu {
    menus {
      nodes {
        name
        menuItems {
          nodes {
            id
            label
            url
          }
        }
      }
    }
  }
`;