export type ArticleSchema = {
  headline: string;
  datePublished: string;
  dateModified: string;
  inLanguage?: string;
  image?: string;
}

export type MetatagsData = {
  title: string;
  desc: string;
  routeName: string;
  noIndex: boolean;
  featuredImage?: string;
  canonicalUrl?: string;
}


export type WebpageSchema = {
  desc: string;
  title: string;
  routeName: string;
}

export type ProductSchema = {
  desc: string;
  schemeName: string;
  routeName: string;
  fundHouse: string;
  rating: number;
  logoUrl?: string;
}

export type FaqSchema = {
  question: string;
  answer: string;
}

export type BreadcrumbSchema = {
  url: string;
  name: string;
}


export type TabsData = {
  searchId: string;
  [key:string]: unknown;
}


export type MultiLevelObject = {
  [key:string]: unknown;
}
