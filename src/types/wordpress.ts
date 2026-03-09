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