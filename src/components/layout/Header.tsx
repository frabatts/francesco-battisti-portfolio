import { fetchGraphQL } from "@/lib/graphql/client";
import { GET_PRIMARY_MENU } from "@/lib/graphql/queries/menus";
import HeaderInner from "./HeaderInner";

interface MenuItem {
  id: string;
  label: string;
  url: string;
}

interface MenuData {
  menus: {
    nodes: {
      name: string;
      menuItems: {
        nodes: MenuItem[];
      };
    }[];
  };
}

export default async function Header() {
  const data = await fetchGraphQL<MenuData>(GET_PRIMARY_MENU);
  const menuItems = data?.menus?.nodes[0]?.menuItems?.nodes ?? [];

  return <HeaderInner menuItems={menuItems} />;
}