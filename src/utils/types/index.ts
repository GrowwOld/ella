export type Article_schema = {
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


export type Webpage_schema = {
  desc: string;
  title: string;
  routeName: string;
}

export type Product_schema = {
  desc: string;
  schemeName: string;
  routeName: string;
  fundHouse: string;
  rating: number;
  logoUrl?: string;
}

export type Faq_schema = {
  question: string;
  answer: string;
}

export type Breadcrumb_schema = {
  url: string;
  name: string;
}
