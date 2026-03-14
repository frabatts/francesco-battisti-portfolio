export interface WPImage {
  sourceUrl: string;
  altText: string;
  width: number;
  height: number;
}

export interface WPSeo {
  title: string;
  metaDesc: string;
  opengraphImage?: WPImage;
}

export interface WPPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage?: {
    node: WPImage;
  };
  seo?: WPSeo;
}

export interface WPPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  featuredImage?: {
    node: WPImage;
  };
  categories?: {
    nodes: {
      id: string;
      name: string;
      slug: string;
    }[];
  };
  seo?: WPSeo;
}

export interface WPMenuItem {
  id: string;
  label: string;
  url: string;
  parentId: string | null;
  childItems?: {
    nodes: WPMenuItem[];
  };
}

// ── Tipi usati nelle page e nei componenti client ──────────────────────────

export interface SEO {
  title: string;
  description: string;
  canonicalUrl: string;
  openGraph: {
    title: string;
    description: string;
  };
}

export interface DettagliProgetto {
  categoria: string;
  anno: number;
  descrizioneBreve: string;
  urlProgetto: string;
}

export interface Progetto {
  id: string;
  title: string;
  slug: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  dettagliProgetto: DettagliProgetto;
}

export interface ProgettoFull extends Progetto {
  content: string;
  seo: SEO;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

export interface PostFull {
  id: string;
  title: string;
  slug: string;
  content: string;
  date: string;
  seo: SEO;
}