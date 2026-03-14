import { fetchGraphQL } from "@/lib/graphql/client";
import { GET_PRIMARY_MENU } from "@/lib/graphql/queries/menus";
import FooterInner from "./FooterInner";

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

export default async function Footer() {
const data = await fetchGraphQL<MenuData>(GET_PRIMARY_MENU, undefined, 86400);
  const menus = data?.menus?.nodes ?? [];
  const primaryMenu = menus.find((m) =>
  m.name.toLowerCase().includes("primary") ||
  m.name.toLowerCase().includes("principale") ||
  m.name.toLowerCase().includes("header") ||
  m.name.toLowerCase().includes("main")
);
  const menuItems = primaryMenu?.menuItems?.nodes ?? [];

  return <FooterInner menuItems={menuItems} />;
}