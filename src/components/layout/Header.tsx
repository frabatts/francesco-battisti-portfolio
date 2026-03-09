import Link from "next/link";
import { fetchGraphQL } from "@/lib/graphql/client";
import { GET_PRIMARY_MENU } from "@/lib/graphql/queries/menus";

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

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "1.5rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Link href="/" style={{ color: "white", textDecoration: "none", fontWeight: 600, fontSize: "1.2rem" }}>
        MyTheme
      </Link>

      <nav>
        <ul style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}>
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.url}
                style={{ color: "white", textDecoration: "none", fontSize: "0.95rem" }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}